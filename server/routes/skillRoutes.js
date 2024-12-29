import express from "express";
import { getSkills, addSkill, getRecentSkills } from "../controllers/skillController.js";
import ensureAuthenticated from "../middlewares/Auth/Auth.js";
import { uploadAvatar } from "../controllers/userController.js";
const router = express.Router();

router.get("/", getSkills);
router.post("/add", ensureAuthenticated, uploadAvatar, addSkill);
router.get('/recent',getRecentSkills);

export default router;
