const express = require("express")
const { User } = require("../models/user.model")
const router = express.Router()
const jwt = require("jsonwebtoken")

router.post("/register",async(req,res)=>{
    const {name,email} = req.body

    try {
        const user = new User({name,email})
        await user.save()
        res.status(200).send({"msg":"New User Registered!"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

router.post("/login",async(req,res)=>{
    const {name,email} = req.body;

    try {
        const user = await User.findOne({email})
        if(user){
            res.status(200).send({"msg":"Login Successful!","token":jwt.sign({email},"saurabh@123")})
        }else{
            res.status(400).send({"msg":"No user found!"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports = {router}