const mongoose = require("mongoose");
const RatingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required : [true, "Please enter a Rating"]
    },
    review : {
        type:String,
        required: [true, "Please give a brief review"]
    },
    gameName: {
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})
module.exports = mongoose.model("Rating", RatingSchema)