import mongoose from 'mongoose';
import User from '../models/user.js';


export const isUserBanned = async (userId) => {
  try {
    const user = await User.findById(userId).select('isBanned');
    return user ? user.isBanned : false;
  } catch (error) {
    console.error("Error checking if user is banned:", error);
    return false;
  }
};
