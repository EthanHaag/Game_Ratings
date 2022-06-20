const Rating = require("../models/rating.model")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET = process.env.JWT_SECRET
module.exports = {
    getRatings: (req,res)=>{
        Rating.find({})
            .then((ratings)=>{
                res.json(ratings);
            })
            .catch((err)=>{
                res.status(400).json({message:'could not find in ratings', error:err})
            })
    },
    createRating: (req,res) => {
        const user = jwt.verify(req.cookies.userToken, SECRET)
        Rating.create({...req.body,createdBy:user._id})
            .then((rating)=>{
                res.status(201).json(rating)
            })
            .catch((err)=>{
                res.status(400).json({message:'could not create in ratings', error:err})
            })
    },
    getByGame: (req,res)=>{
        Rating.find({gameName:req.params.gameName}).populate('createdBy', 'userName')
            .then((ratings) => {
                res.json(ratings)
            })
            .catch((err)=>{
                res.status(400).json({message:'could not Find in Games from ratings', error:err})
            })
    },
    getById: (req,res)=>{
        Rating.findOne({_id:req.params.id})
            .then((rating) => {
                res.json(rating)
            })
            .catch((err)=>{
                res.status(400).json({message:'could not Find in Id', error:err})
            })
    },
    updateRating: (req,res) => {
        const user = jwt.verify(req.cookies.userToken, SECRET)
        Rating.findByIdAndUpdate({_id:req.params.id, createdBy:user._id}, req.body, {new:true, runValidators: true})
            .then((updatedRating) =>{
                res.json(updatedRating)
            })
            .catch((err)=>{
                res.status(400).json({message:'could not Find in Update', error:err})
            })
    },
    deleteRating: (req,res) => {
        Rating.deleteOne({_id:req.params.id})
            .then((deletedConfirm)=>{
                res.json(deletedConfirm)
            })
            .catch((err)=>{
                res.status(400).json({message:'could not Find in Delete', error:err})
            })
    }
}