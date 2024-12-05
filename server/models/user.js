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
  skillsOffered: {
    type: [String],
    default: [],
  },
  skillsRequested: {
    type: [String],
    default: [],
  },
  rating: {
    type: Number,
    default: 5,
  },
  reviews: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
  },
  photo: {
    type: String,
  },
  collaborationInterest: {
    type: [String],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
