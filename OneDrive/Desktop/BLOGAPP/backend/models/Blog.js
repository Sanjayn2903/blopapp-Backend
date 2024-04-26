const mongoose = require('mongoose')
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Types.ObjectId,  //referencing the User model
        ref:"User",                     //the
        required:true
    }
})
module.exports =  mongoose.model("Blog",blogSchema)