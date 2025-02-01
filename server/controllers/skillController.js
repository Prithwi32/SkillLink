import Skill from "../models/skill.js";

// Fetch skills based on query
export const getSkills = async (req, res) => {
  const query = req.query.query || "";
  try {
    const skills = await Skill.find({
      name: new RegExp(query, "i"),
      status: "Approved",
    });
    res.json(skills);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching skills", error: error.message });
  }
};

// Add a new skill
export const addSkill = async (req, res) => {
  const { name, desc } = req.body;
  try {
    if (!name || !desc) {
      return res
        .status(400)
        .json({ message: "Name and Description are required" });
    }

    let photo = "";
    if (req.file) {
      photo = req.file.path;
    }

    // check whether skill already exists in database
    const existingSkill = await Skill.findOne({ name, status: "Approved" });
    if (existingSkill) {
      return res.status(200).json({
        success: true,
        message: "Skill you are requesting already exists",
      });
    }

    const newSkill = new Skill({ name, desc, photo, status: "Pending" });
    await newSkill.save();

    res
      .status(201)
      .json({ success: true, message: `Skill ${name} successfully requested` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating skill", error: error.message });
  }
};

// get recently added 10 approved skills
export const getRecentSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ status: "Approved" });

    if (skills.length > 7) {
      // Shuffle array using Fisher-Yates algorithm
      for (let i = skills.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [skills[i], skills[j]] = [skills[j], skills[i]];
      }
    }

    // Pick the first 7 random skills
    const randomSkills = skills.slice(0, 7);

    res.status(200).json({ success: true, skills: randomSkills });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching skills", error: error.message });
  }
};
