//backend/Controllers/UserControllers.js

const User = require('../Schemas/UserSchema')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signupSchema, loginSchema } = require('../Validations/UserValidation');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '../../.env.local') });



const generateToken = (userId)=>{
    return jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'1h'})
}


const SignInUser = async(req,res)=>{
    try {
        const {username, email,password} = signupSchema.parse(req.body)
        
        const existingUser = await User.findOne({email});
        if (existingUser)
        {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = await User.create({username,email,password:hashedPassword})

        const token = generateToken(newUser._id)

        return res.status(201).json({ message: "Signup successful", token });
            

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


const LogInUser = async(req,res)=>{
    try {
        const {email,password} = loginSchema.parse(req.body);
        const user = await User.findOne({email});
        if(!user)
        {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        const token = generateToken(user._id);
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}


module.exports = {SignInUser,LogInUser}