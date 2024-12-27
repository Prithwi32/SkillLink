import Skill from '../models/skill.js';

// Fetch skills based on query
export const getSkills = async (req, res) => {
  const query = req.query.query || '';
  try {
    const skills = await Skill.find({ name: new RegExp(query, 'i'), status: 'Approved', });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills', error: error.message });
  }
};

// Add a new skill
export const addSkill = async (req, res) => {
  try {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Error creating skill', error: error.message });
  }
};
