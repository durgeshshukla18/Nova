import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}


// API to register a new user

export const registerUser = async(req, res) => {
    const { name, email, password } = req.body;

    try{
        // Check if user already exists
        const userExits = await User.findOne({ email });

        if(userExits){
            return res.status(400).json({success: false, message: "User already exists" });
        }
        const user = new User({ name, email, password });

        const token = generateToken(user._id);
        res.json({success: true, token});
        await user.save();
        // res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });

    }
}


// API to login a user
export const loginUser = async(req, res) => {
    const { email, password } = req.body;

    try{
        // Check if user exists
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({success:false ,message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({ success:false, message: "Invalid email or password" });
        }
        const token = generateToken(user._id);
        res.json({ success:true, token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}


// API to get user data
export const getUser = async(req, res) => {
    try{
        const user = req.user;
        res.json({ success:true, user });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }   
}