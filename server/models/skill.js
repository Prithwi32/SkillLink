import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
    trim: true,
    maxLength: 255,
  },
});

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
