import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password){
        return res.status(400).json({ message: "Please fill all fields" });
    }

    const userExists = await User.findOne({ email });
    if(userExists){
        return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ username, email, password });
    if(user){
        res.status(201).json({ message: "User registered successfully" });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
};

// @desc    Login user & get token
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(user && (await user.matchPassword(password))){
        const token = generateToken(user._id);
        res.json({ token });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
};

// @desc    Get user info
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");
    if(user){
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
};