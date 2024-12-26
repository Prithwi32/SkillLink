import mongoose from "mongoose";
import User from "../models/user.js";
import Skill from "../models/skill.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profile_pics",
    allowed_formats: ["jpg", "png", "avif", "jpeg"],
  },
});

const upload = multer({ storage: storage });

export const uploadAvatar = upload.single("photo");

export const editProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, about, skillsOffered, skillsRequested } = req.body;

    let avatarUrl = req.user?.photo || "";

    if (req.file) {
      avatarUrl = req.file.path;
    }

    let parsedSkillsOffered, parsedSkillsRequested;
    try {
      parsedSkillsOffered = JSON.parse(skillsOffered);
      parsedSkillsRequested = JSON.parse(skillsRequested);
    } catch (parseError) {
      console.error("Error parsing skills data:", parseError.message);
      return res
        .status(400)
        .json({
          error: "Error parsing skills data",
          details: parseError.message,
        });
    }

    // Fetch the user to ensure the photo URL is not overwritten
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user with the new data
    user.name = name || user.name;
    user.about = about || user.about;
    user.skillsOffered = parsedSkillsOffered || user.skillsOffered;
    user.skillsRequested = parsedSkillsRequested || user.skillsRequested;
    user.photo = avatarUrl || user.photo;

    // Save the updated user back to the database
    const updatedUser = await user.save();

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", JSON.stringify(error, null, 2));
    res
      .status(500)
      .json({
        error: "Error updating profile",
        details: error.message,
        stack: error.stack,
      });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isBanned: false })
      .select("name skillsOffered rating photo _id")
      .lean();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const getUserById = async (req, res) => {
  const isUserBanned = (user) => user && user.isBanned;
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const user = await User.findById(userId)
      .select(
        "name email about skillsOffered skillsRequested rating photo isBanned"
      )
      .lean();

    if (!user || isUserBanned(user)) {
      return res.status(404).json({
        success: false,
        message: "User not found or is banned",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const getUsersBasedOnSkills = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("User ID:", userId);

    const user = await User.findById(userId).select("skillsRequested").lean();
    console.log("User:", user);

    if (!user || !user.skillsRequested || user.skillsRequested.length === 0) {
      console.log("No skills requested by user");
      return res.status(200).json({
        success: true,
        users: [],
      });
    }

    const skillsRequestedByUser = user.skillsRequested;
    console.log("Skills requested by user:", skillsRequestedByUser);

    // Fetch users who offer any of the requested skills and are not banned, excluding the current user
    const users = await User.find({
      skillsOffered: { $in: skillsRequestedByUser },
      isBanned: false,
      _id: { $ne: userId },
    })
      .select("name skillsOffered rating photo")
      .lean();
    console.log("Matching users:", users);

    res.status(200).json({
      success: true,
      users: users,
    });
  } catch (err) {
    console.error("Error fetching users based on skills:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const getUsersForSpecificSkill = async (req, res) => {
  try {
    const { skillId } = req.params;
    console.log("Skill Id:", skillId);
    if (!skillId) {
      return res
        .status(400)
        .json({ success: false, message: "Skill ID is required" });
    }
    const skill = await Skill.findById(skillId);
    console.log("Skill found:", skill);
    if (!skill) {
      return res
        .status(404)
        .json({ success: false, message: "Skill not found" });
    }
    const skillName = skill.name;
    console.log("Skill Name:", skillName);
    const users = await User.find({
      skillsOffered: skillName,
      isBanned: false,
    })
      .select("name skillsOffered about rating photo")
      .lean();
    console.log("Matching users:", users);
    res.status(200).json({ success: true, users });
  } catch (err) {
    console.error("Error fetching users for specific skill:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
