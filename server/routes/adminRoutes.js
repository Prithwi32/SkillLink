import { Router } from "express";
import {
  adminLogin,
  approveSkill,
  checkAuth,
  getApprovedSkills,
  getPendingSkills,
  getRejectedSkills,
  rejectSkill,
  adminLogout,
} from "../controllers/adminController.js";
import { loginValidation } from "../middlewares/AuthValidation.js";
import { adminAuth } from "../middlewares/Auth.js";

const router = Router();

// get requests
router.get("/skills/approved", getApprovedSkills);
router.get("/skills/rejected", adminAuth, getRejectedSkills);
router.get("/skills/pending", adminAuth, getPendingSkills);

// post requests
router.put("/skills/approve/:id", adminAuth, approveSkill);
router.put("/skills/reject/:id", adminAuth, rejectSkill);

// admin authentication
router.post("/auth/login", loginValidation, adminLogin);
router.get("/auth/check-auth", adminAuth, checkAuth);
router.post("/auth/logout", adminLogout);

export default router;
