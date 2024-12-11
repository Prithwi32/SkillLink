import { Router } from "express";
import ensureAuthenticated from "../middlewares/Auth/Auth.js";
import {
  createNewSession,
  getAllSessions,
  markSessionCancelled,
  markSessionCompleted,
  updateSession,
} from "../controllers/sessionController.js";
import {
  createSessionValidation,
  editSessionValidation,
} from "../middlewares/sessionValidation.js";

const router = Router();

// post request
router.post(
  "/new",
  ensureAuthenticated,
  createSessionValidation,
  createNewSession
);

// get request
router.get("/my-sessions", ensureAuthenticated, getAllSessions);

// put request
router.put(
  "/edit/:sessionId",
  ensureAuthenticated,
  editSessionValidation,
  updateSession
);
router.put("/:sessionId/complete", ensureAuthenticated, markSessionCompleted);
router.put("/:sessionId/cancel", ensureAuthenticated, markSessionCancelled);

export default router;
