import { User } from "../../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../../utils/utils.js";
import e from "express";

// @desc    Register a new user
// @router   /api/users
// @access  Public

export const registerUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
        const userExists = await User.findOne({ email });

        if(userExists){
            throw new Error("User already exists");
        }

        const user = await User.create({
            email,
            password,
        });

        if(user){
            res.status(201).json({
                _id: user._id,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        }else{
            throw new Error("Invalid user data");
        }
});

// @desc    Login a user
// @router   /api/users/login
// @access  Public

export const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(user && (await bcrypt.compare(password, user.password))){
            res.status(200).json({
                _id: user._id,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        }else{
            throw new Error("Invalid email or password");
        }
});

// @desc    Get user profile
// @router   /api/users/profile
// @access  Private

export const getUserProfile = expressAsyncHandler(async (req, res) => {
    const { _id } = req.body;

    const user = await User.findById(_id);

    if(user){
        res.status(200).json({
            _id: user._id,
            email: user.email,
            role: user.role,
        });
    }else{
        throw new Error("User not found");
    }
});


// @desc    Update user profile
// @router   /api/users/profile
// @access  Private

export const updateUserProfile = expressAsyncHandler(async (req, res) => {
    const { _id } = req.body;
    const user = await User.findById(_id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password;
        }
        user.address = req.body.address || user.address;
        user.phone = req.body.phone || user.phone;

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            email: updatedUser.email,
            role: updatedUser.role,
            token: generateToken(updatedUser._id),
        });
    }else{
        throw new Error("User not found");
    }
});

// @desc    Get all users
// @router   /api/users
// @access  Private

export const getUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    if(users){
        res.status(200).json(users);
    }else{
        throw new Error("No users found");
    }
});

// @desc    Delete user
// @router   /api/users/:id
// @access  Private

export const deleteUser = expressAsyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if(user){
        res.status(200).json({ message: "User deleted" });
    }else{
        throw new Error("User not found");
    }
});