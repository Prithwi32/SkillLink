import { Router } from "express";
import {
  blockReportedUserByAdmin,
  createNewReport,
  getAllBannedUsers,
  getAllReasonsForReportedUser,
  getAllReportedUserWithCountK,
} from "../controllers/reportedUserController.js";
import ensureAuthenticated, { adminAuth } from "../middlewares/Auth/Auth.js";
import { createNewReportValidation } from "../middlewares/reportedUserValidation.js";

const router = new Router();

// create a new report
router.post(
  "/new",
  ensureAuthenticated,
  createNewReportValidation,
  createNewReport
);

// get all user with report count greater than or equal to k
router.get("/reported", adminAuth, getAllReportedUserWithCountK);

// block user permanently
router.put("/block/:userId", adminAuth, blockReportedUserByAdmin);

// get all reasons for reported user
router.get("/reasons/:userId", adminAuth, getAllReasonsForReportedUser);

// get all banned users
router.get("/blocked", adminAuth, getAllBannedUsers);

export default router;
