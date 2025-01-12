import Review from "../models/review.js";
import Session from "../models/session.js";
import Skill from "../models/skill.js";
import User from "../models/user.js";

// api to create a new review
export const createReview = async (req, res) => {
  const { reviewedTo, sessionId, skillId, rating, comment } = req.body;
  const { _id } = req.user;

  try {
    if (reviewedTo == _id) {
      return res
        .status(403)
        .json({ success: false, message: "You cannot review yourself!" });
    }

    const reviewedUser = await User.findById({ _id: reviewedTo });

    // check whether the user being reviewed exists
    if (!reviewedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // check whether skill exists
    const skill = await Skill.findById({ _id: skillId, status: "Approved" });

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: "Either Skill not found or is not approved by admin",
      });
    }

    // check whether session exists
    const session = await Session.findOne({ _id: sessionId });

    if (!session || session.status == "Cancelled") {
      return res.status(404).json({
        success: false,
        message: "Either Session not found or session is cancelled",
      });
    }

    // check whether user is one the user in session
    if (
      !(
        session.userOne.toString() === _id || session.userTwo.toString() === _id
      )
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not a part of this session",
      });
    }

    // check whether user has already reviewed the user in the session
    if (
      (session.userOne.toString() == _id &&
        session.isReviewProvidedByUserOne) ||
      (session.userTwo.toString() == _id && session.isReviewProvidedByUserTwo)
    ) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this user in this session",
      });
    }

    // create new review
    const newReview = new Review({
      reviewedBy: _id,
      userId: reviewedTo,
      sessionId,
      skillId,
      rating,
      comment,
    });

    await newReview.save();

    // make isReview provided by user in session model true
    if (session.userOne.toString() === _id) {
      session.isReviewProvidedByUserOne = true;
    } else {
      session.isReviewProvidedByUserTwo = true;
    }
    await session.save();

    return res
      .status(201)
      .json({ success: true, message: "Review created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// api to get all reviews for a given userId
export const getReviews = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const reviews = await Review.find({ userId: id })
      .populate("skillId")
      .populate("reviewedBy", "name _id photo")
      .populate({
        path: "sessionId",
        select: "skillTaughtByUserOne skillTaughtByUserTwo",
        populate: [
          { path: "skillTaughtByUserOne" },
          { path: "skillTaughtByUserTwo" },
        ],
      });
    return res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllReviewsProvidedByAParticualrUserId = async (req, res) => {
  const { _id } = req.user;

  try {
    if (!_id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const reviews = await Review.find({ reviewedBy: _id })
      .populate("skillId")
      .populate("userId", "name _id photo")
      .populate({
        path: "sessionId",
        select: "skillTaughtByUserOne skillTaughtByUserTwo",
        populate: [
          { path: "skillTaughtByUserOne" },
          { path: "skillTaughtByUserTwo" },
        ],
      });

    return res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// api to update a review by the review provider
export const updateReview = async (req, res) => {
  const { rating, comment } = req.body;
  const { reviewId } = req.params;
  const { _id } = req.user;

  try {
    const review = await Review.findOneAndUpdate(
      { _id: reviewId, reviewedBy: _id },
      { rating, comment }
    );

    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Review updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// api to delete a review by the review provider
export const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const { _id } = req.user;

  try {
    const review = await Review.findOneAndDelete({
      _id: reviewId,
      reviewedBy: _id,
    });

    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
