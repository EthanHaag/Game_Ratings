const User = require('../models/user.model');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.JWT_SECRET
const register = async (req, res) => {
    const user = new User(req.body)
    if(!user){
        res.status(400).json({message:'Invalid register'})
    }
    else{
        try{
        const newUser = await user.save()
        console.log("NEW USER", newUser)
        const userToken = jwt.sign({
            _id:newUser._id,
            email:newUser.email,
            userName:newUser.userName
        },
        SECRET,
        );
        res.status(201).cookie('userToken', userToken, {
            expires:new Date(Date.now()+10000000)
        }).json({
            user:{
            _id:newUser._id,
            email:newUser.email,
            userName:newUser.userName
        }})
        } catch(err) {
            console.log("USER CREATION FAILED", err)
            res.json(err)
        }
    }

}
const login = async(req,res)=>{
    const userDoc = await User.findOne({userName: req.body.userName});
    if(!userDoc){
        res.status(400).json({message:'Invalid Login'})
    }
    else{
        try{
            const isPasswordValid = await bcrypt.compare(req.body.password, userDoc.password)
            if(!isPasswordValid){
                res.status(400).json({message:'Invalid Login'})
            }
            else{
                const userToken = jwt.sign({
                    _id:userDoc._id,
                    email:userDoc.email,
                    userName:userDoc.userName
                },
                SECRET,
                );
                res.status(201).cookie('userToken', userToken, {
                    expires:new Date(Date.now()+10000000)
                }).json({
                    user:{
                    _id:userDoc._id,
                    email:userDoc.email,
                    userName:userDoc.userName
                }})
            }
        }
        catch(err){
            console.log("LOGIN FAILED", err)
            res.status(400).json({message:'Invalid Login'})
        }
    }
}
const logout= (req,res) =>{
    res.clearCookie('userToken')
    res.json({message: "you have logged out"})
}
const getLoggedInUser = async (req, res) =>{
    try{
        const userKey = jwt.verify(req.cookies.userToken, SECRET)
        const user = await User.findOne({_id:userKey._id})
        res.json(user)
    }
    catch(err){
        res.status(400).json({err})
    }
}
module.exports= {
    register,
    login,
    logout,
    getLoggedInUser
}
