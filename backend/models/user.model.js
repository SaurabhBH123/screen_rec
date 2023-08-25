const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
},{
    versionKey:false
})

const User = mongoose.model("user",userSchema)

module.exports = {User}