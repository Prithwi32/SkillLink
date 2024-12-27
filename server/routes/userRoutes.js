import express from 'express';
import {  editProfile, getAllUsers, getUserById, getUsersBasedOnSkills, getUsersForSpecificSkill, uploadAvatar } from '../controllers/userController.js';
import ensureAuthenticated from "../middlewares/Auth/Auth.js"

const router = express.Router();

// Route to get All users
router.get('/getAll', getAllUsers);

// Route to get user by ID
router.get("/get/:userId", ensureAuthenticated, getUserById);

// Route to update user profile
// router.put("/:userId", ensureAuthenticated, updateUserProfile);

// Route to get users based on skills requested (recommend mentors)
router.get("/userRecommend", ensureAuthenticated, getUsersBasedOnSkills);

// Route to get users for a specific skill
router.get("/:skillId", getUsersForSpecificSkill);

// Route to update user profile
router.put("/edit/:id", ensureAuthenticated, uploadAvatar, editProfile);

export default router;
