import Skill from "../models/skill.js";
import jwt from "jsonwebtoken";

// api to get all approved skills
export const getApprovedSkills = async (req, res) => {
  try {
    const approvedSkills = await Skill.find({ status: "Approved" });
    return res.status(200).json({ success: true, skills: approvedSkills });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// api to get all pending skills
export const getPendingSkills = async (req, res) => {
  try {
    const pendingSkills = await Skill.find({ status: "Pending" });
    return res.status(200).json({ success: true, skills: pendingSkills });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// api to get all rejected skills
export const getRejectedSkills = async (req, res) => {
  try {
    const rejectedSkills = await Skill.find({ status: "Rejected" });
    return res.status(200).json({ success: true, skills: rejectedSkills });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// api reject a skill
export const rejectSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, {
      status: "Rejected",
    });
    return res
      .status(200)
      .json({ success: true, message: `Skill ${skill.name} rejected` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// api to approve a skill
export const approveSkill = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, {
      status: "Approved",
    });
    return res
      .status(200)
      .json({ success: true, message: `Skill ${skill.name} approved` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// api for admin login
export const adminLogin = (req, res) => {
  const { email, password } = req.body;

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // console.log("Generated token" + token);

  res
  .cookie("token", token, {
    httpOnly: true, // Helps to prevent XSS attacks
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  })
  .json({ success: true, message: "Logged in successfully" });

};

// api to to check whether admin is already logged in
export const checkAuth = (req, res) => {
  const { email } = req.body;

  if (email !== process.env.ADMIN_EMAIL) {
    return res
      .status(401)
      .json({ success: false, message: "Authentication failed" });
  }
  return res.json({ success: true, message: "Authentication successful" });
};

// api for admin logout
export const adminLogout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure only in production
  });

  res.status(200).json({ success: true, message: "Logged out" });
};

