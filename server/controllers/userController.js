import User from '../models/user.js'

export const createUser = async (req, res) => {
  try {
    const { name, email, hobbies } = req.body;
    const user = new User({ name, email, hobbies });
    const savedUser = await user.save();
    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};