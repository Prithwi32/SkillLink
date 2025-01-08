import ReportedUser from "../models/reportedUser.js";
import User from "../models/user.js";

const k = 1;

// create a new report
const createNewReport = async (req, res) => {
  try {
    const { _id } = req.user;
    const { reportedUser, reason } = req.body;

    // check whether use is reporting self
    if (_id == reportedUser) {
      return res.status(400).json({
        success: false,
        message: "You cannot report yourself",
      });
    }

    // check if the reportedUser exists in the user collection
    const user = await User.findById({ _id: reportedUser, isBanned: false });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // check if user has already reported by the same person
    const alreadyReported = await ReportedUser.findOne({
      reportedBy: _id,
      reportedUser: reportedUser,
    });

    if (alreadyReported) {
      return res.status(409).json({
        success: false,
        message:
          "You already reported this user. Cannot report more than once.",
      });
    }

    // create a new report
    const report = new ReportedUser({
      reportedBy: _id,
      reportedUser: reportedUser,
      reason,
    });

    await report.save();

    return res
      .status(201)
      .json({ success: true, message: `${user.name} reported to admin.` });
  } catch (error) {
    console.error("Error creating report:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get all reported users with report count greater than equal k
const getAllReportedUserWithCountK = async (req, res) => {
  try {
    const reportedUsers = await ReportedUser.aggregate([
      {
        $group: {
          _id: "$reportedUser",
          reportCount: { $sum: 1 },
        },
      },
      {
        $match: {
          reportCount: { $gte: k },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $match: {
          "userDetails.isBanned": false,
        },
      },
      {
        $project: {
          _id: 0,
          userId: "$userDetails._id",
          name: "$userDetails.name",
          email: "$userDetails.email",
          about: "$userDetails.about",
          photo: "$userDetails.photo",
          reportCount: 1,
        },
      },
    ]);

    return res.json({ success: true, reportedUsers });
  } catch (error) {
    console.error("Error fetching reported users with count k:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// block the user permanently form website by admin
const blockReportedUserByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const reportedUser = userId;

    // check if the reportedUser exists in the user collection
    const user = await User.findOne({ _id: reportedUser, isBanned: false });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // check wether reported user has report count of k or more
    const reportCount = await ReportedUser.countDocuments({ reportedUser });

    if (reportCount < k) {
      return res.status(403).json({
        success: false,
        currentReportCount: reportCount,
        message: `User has less than ${k} reports. Cannot block.`,
      });
    }

    // block the user
    user.isBanned = true;
    await user.save();

    // Logic for deleting all activities done by blocked user in the website

    return res
      .status(200)
      .json({ success: true, message: `${user.name} blocked permanently.` });
  } catch (error) {
    console.error("Error blocking reported user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get all reasons for a reported user(with report count greater than k) by id
const getAllReasonsForReportedUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const reportedUser = userId;

    // check if the reportedUser exists in the user collection
    const user = await User.findOne({ _id: reportedUser });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // check wether reported user has report count of k or more
    const reportCount = await ReportedUser.countDocuments({ reportedUser });

    if (reportCount < k) {
      return res.status(403).json({
        success: false,
        currentReportCount: reportCount,
        message: `User has less than ${k} reports. Cannot display reasons.`,
      });
    }

    // get all reasons for the reported user
    const reasons = await ReportedUser.find({ reportedUser })
      .populate("reportedBy", "name _id photo")
      .select("reportedBy reason dateReported");

    return res.json({ success: true, reasons });
  } catch (error) {
    console.error("Error fetching reasons for reported user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// get all banned users
const getAllBannedUsers = async (req, res) => {
  try {
    const bannedUsers = await User.find({ isBanned: true }).select(
      "_id name about email photo"
    );

    return res.json({ success: true, bannedUsers });
  } catch (error) {
    console.error("Error fetching banned users:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// check whether user already submitted report once for the given userId
const checkWetherReportAlreadySubmitted = async (req, res) => {
  const { _id } = req.user;
  const { reportedUserId } = req.query;

  try {
    const alreadyReported = await ReportedUser.findOne({
      reportedBy: _id,
      reportedUser: reportedUserId,
    });

    if (alreadyReported) {
      return res.status(409).json({
        success: false,
        message:
          "You already reported this user. Cannot report more than once.",
      });
    }

    return res.json({ success: true, message: "No report submitted yet." });
  } catch (error) {
    console.error("Error checking wether report already submitted:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export {
  createNewReport,
  getAllReportedUserWithCountK,
  blockReportedUserByAdmin,
  getAllReasonsForReportedUser,
  getAllBannedUsers,
  checkWetherReportAlreadySubmitted,
};
