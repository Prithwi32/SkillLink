import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      skillsOffered = [],
      skillsRequested = [],
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      if (existingUser.isBanned) {
        return res.status(403).json({
          message: "Sign-up denied: User is banned",
          success: false,
        });
      }
      return res.status(409).json({
        message: "User already exists, you can login",
        success: false,
      });
    }
    const newUser = new User({
      name,
      email,
      password,
      skillsOffered: Array.isArray(skillsOffered)
        ? skillsOffered
        : [skillsOffered].filter(Boolean),
      skillsRequested: Array.isArray(skillsRequested)
        ? skillsRequested
        : [skillsRequested].filter(Boolean),
    });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();

    res.status(201).json({
      message: "SignUp successful",
      success: true,
      user: {
        name: newUser.name,
        email: newUser.email,
        skillsOffered: newUser.skillsOffered,
        skillsRequested: newUser.skillsRequested,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const errorMessage = "Auth Failed: email or password not found!";
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(403).json({
          message: errorMessage,
          success: false,
        });
      }
      if (user.isBanned) {
        return res.status(403).json({
          message: "Login denied: User is banned",
          success: false,
        });
      }
      const isPasswordEqual = await bcrypt.compare(password, user.password);
      if (!isPasswordEqual) {
        return res.status(403).json({
          message: errorMessage,
          success: false,
        });
      }
  
      const jwtToken = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
  
      res.status(200).json({
        message: "Login Success",
        success: true,
        jwtToken,
        name: user.name,
        email: user.email,
      });
    } catch (err) {
      console.error('Error in login:', err);
      res.status(500).json({
        message: "Internal server error",
        success: false,
        error: err.message
      });
    }
};


export const checkAuth = (req, res) => {
  if(!req.user)
    return res.status(401).json({ success: false, message: "Not authenticated" });
  res.json({ success: true, user: req.user });
}