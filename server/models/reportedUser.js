import mongoose from "mongoose";

const reportedUserSchema = new mongoose.Schema({
  reportedUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reportedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reason: {
    type: String,
    required: true,
    trim: true,
    maxLength: 255,
  },
  dateReported: {
    type: Date,
    default: Date.now,
  },
});

const ReportedUser = mongoose.model("ReportedUser", reportedUserSchema);

export default ReportedUser;
