import mongoose from "mongoose";
import Session from "../models/session.js";
import Skill from "../models/skill.js";
import User from "../models/user.js";

// create a new session
export const createNewSession = async (req, res) => {
  const { date, userTwo, skillTaughtByUserOne, skillTaughtByUserTwo, link } =
    req.body;
  const { _id } = req.user;

  try {
    // check whether user creating session for self
    if (_id == userTwo) {
      return res.status(400).json({
        success: false,
        message: "You cannot create session with yourself",
      });
    }

    const user = await User.findById({ _id: userTwo });

    // check whether user with which session is going to be exist
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User you are trying to exchange skill not found",
      });
    }

    const skill1 = await Skill.findOne({
      _id: skillTaughtByUserOne,
      status: "Approved",
    });

    const skill2 = await Skill.findOne({
      _id: skillTaughtByUserTwo,
      status: "Approved",
    });

    // check if both skills are approved
    if (!skill1 || !skill2) {
      return res.status(404).json({
        success: false,
        message: "Skills you are trying to exchange not approved",
      });
    }

    // check if already there exists a session with same information created by other user involved in session
    const sessionDate = new Date(date).toISOString();

    let existingSession = await Session.findOne({
      date: sessionDate,
      userOne: new mongoose.Types.ObjectId(userTwo),
      userTwo: new mongoose.Types.ObjectId(_id),
      skillTaughtByUserOne: new mongoose.Types.ObjectId(skillTaughtByUserOne),
      skillTaughtByUserTwo: new mongoose.Types.ObjectId(skillTaughtByUserTwo),
    });

    if (existingSession) {
      return res.status(409).json({
        success: false,
        message: `A session with same details already created by ${user.name}`,
      });
    }

    // check if user has already created a session with the same information
    existingSession = await Session.findOne({
      date: sessionDate,
      userOne: new mongoose.Types.ObjectId(_id),
      userTwo: new mongoose.Types.ObjectId(userTwo),
      skillTaughtByUserOne: new mongoose.Types.ObjectId(skillTaughtByUserOne),
      skillTaughtByUserTwo: new mongoose.Types.ObjectId(skillTaughtByUserTwo),
    });

    if (existingSession) {
      return res.status(409).json({
        success: false,
        message: "A session with same details already created by you",
      });
    }

    // create a new session
    const session = new Session({
      date,
      userOne: _id,
      userTwo: user._id,
      skillTaughtByUserOne: skill1._id,
      skillTaughtByUserTwo: skill2._id,
      link,
    });

    await session.save();
    res
      .status(201)
      .json({ sucess: true, message: "Session created successfully" });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get all sessions for a given user id
export const getAllSessions = async (req, res) => {
  const { _id } = req.user;

  try {
    // get all session for given _id where id can be userOne or userTwo
    const sessions = await Session.find({
      $or: [{ userOne: _id }, { userTwo: _id }],
    })
      .populate("skillTaughtByUserOne skillTaughtByUserTwo")
      .populate("userOne", "name _id")
      .populate("userTwo", "name _id");

    res.json({ success: true, sessions });
  } catch (error) {
    console.error("Error getting sessions:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// update session details for a given session id
export const updateSession = async (req, res) => {
  const { sessionId } = req.params;
  const { _id } = req.user;
  const { date, link, skillTaughtByUserOne, skillTaughtByUserTwo } = req.body;

  try {
    // find the session with sessionId and _id that can be either userOne or userTwo
    const session = await Session.findOne({
      _id: sessionId,
      $or: [{ userOne: _id }, { userTwo: _id }],
    });

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    // check whether session status is already completed
    if (session.status === "Completed" || session.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message:
          "Session is either already completed or cancelled. Cannot do further modifications",
      });
    }

    // update the session
    await Session.findByIdAndUpdate(sessionId, {
      link,
      date,
      skillTaughtByUserOne,
      skillTaughtByUserTwo,
    });

    res.json({ success: true, message: "Session updated successfully" });
  } catch (error) {
    console.error("Error updating session:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Mark the session completed
export const markSessionCompleted = async (req, res) => {
  const { sessionId } = req.params;
  const { _id } = req.user;

  try {
    const session = await Session.findOne({ _id: sessionId, userOne: _id });
    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    // check whether session status is already completed or canceled
    if (session.status === "Completed" || session.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message:
          "Session is already completed or cancelled. Cannot mark as completed",
      });
    }

    // update the session status
    await Session.findByIdAndUpdate(sessionId, { status: "Completed" });
    res.json({
      success: true,
      message: "Session marked as completed successfully",
    });
  } catch (error) {
    console.error("Error marking session as completed:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// mark the session cancelled
export const markSessionCancelled = async (req, res) => {
  const { sessionId } = req.params;
  const { _id } = req.user;

  try {
    const session = await Session.findOne({ _id: sessionId, userOne: _id });

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }

    // check whether session status is already completed or cancelled
    if (session.status === "Completed" || session.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message:
          "Session is already completed or cancelled. Cannot mark as cancelled",
      });
    }

    // update the session status
    await Session.findByIdAndUpdate(sessionId, { status: "Cancelled" });

    res.json({
      success: true,
      message: "Session marked as cancelled successfully",
    });
  } catch (error) {
    console.error("Error marking session as cancelled:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
