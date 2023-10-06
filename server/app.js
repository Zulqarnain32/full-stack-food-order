const express = require('express')
const mongoose = require('mongoose')
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserModel = require('./model/UserSchema')
const port = 5000;
app.use(cors({
    origin: ['http://localhost:5173'],
    method: ['GET','POST'],
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

mongoose.connect('mongodb://127.0.0.1:27017/orderfood')
.then(() => {
    console.log("connected successfully");
}).catch(err => console.log(err))


//register the user

app.post('/register', async (req,res) => {
    const { name,email,password } = req.body;
    if(!name || !email || !password){
        return res.json({message:"please fil all fields"})
    }
    const user = await UserModel.findOne({email})
    if(user){
        return res.json({message:"email already exist"})
    }
    const hashPassword = await bcrypt.hash(password,10)
    const newUser = new UserModel({name,email,password:hashPassword})
    await newUser.save()
    return res.json({message:"user register successfully"})
})

// login the user

app.post('/login' , async (req,res) => {
    const { email,password } = req.body;
    if( !email || !password){
        return res.json({message:"please fil all fields"})
    }
    const user = await UserModel.findOne({email})
    if(!user){
        return res.json({message:"email not found"})
    }
    const validPassword = await bcrypt.compare(password,user.password)
    if(!validPassword){
        return res.json({message:"incorrect password"})
    }

    const token = jwt.sign({id: user._id},"Secret Key");
    res.cookie("token",token);
    return res.json({message:"user login " , id: user._id})

})

//logout the user

app.get('/logout',  (req,res) => {
    res.clearCookie('token')
    return res.json({message:"token removed"})
})


app.listen(port, () => {
    console.log("server is listening at port no 5000");
})

