import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"],
    default: "Scheduled",
  },
  userOne: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userTwo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  skillsInvolved: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Skill",
    required: true,
    validate: [(array) => array.length > 0, "At least one skill is required."],
  },
  link: {
    type: String,
    default: "Add meeting link",
  },
});

const Session = mongoose.model("Session", sessionSchema);

export default Session;
