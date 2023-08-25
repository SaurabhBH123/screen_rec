const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const { router } = require("./routes/user.routes")
require("dotenv").config()
const app = express()

app.use(express.json())
app.use(cors())

app.use("/",router)
app.get("/",(req,res)=>{
    res.send("Hello Everyone!")
})

app.listen(process.env.port,async()=>{
    try {
        await mongoose.connect(process.env.mongoURL)
        console.log("connected to DB")
    } catch (error) {
        console.log(error);
    }
    console.log(`Server is running at port ${process.env.port}`);
})