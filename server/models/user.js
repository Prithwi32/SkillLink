import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    default: ""
  },
  skillsOffered: {
    type: [String],
    ref: "Skill",
    default: [],
  },
  skillsRequested: {
    type: [String],
    ref: "Skill",
    default: [],
  },
  rating: {
    type: Number,
    default: 5,
  },
  reviews: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
    default: null,
  },
  photo: {
    type: String,
  },
  isBanned: {
    type: Boolean,
    default: false,
  }
});

const User = mongoose.model("User", userSchema);

export default User;
