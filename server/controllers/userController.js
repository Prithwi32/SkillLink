import mongoose from "mongoose";
import User from "../models/user.js";
import Skill from "../models/skill.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isBanned: false })
      .select("name skillsOffered rating photo")
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
  const isuserBanned = (user) => user && user.isBanned;
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

    if (!user || isuserBanned(user)) {
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
    res
      .status(500)
      .json({
        success: false,
        message: "Internal server error",
        error: err.message,
      });
  }
};
