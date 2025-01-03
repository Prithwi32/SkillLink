import express from "express";
import { signup, login, checkAuth } from "../controllers/AuthController.js";
import { signupValidation, loginValidation } from "../middlewares/Auth/AuthValidation.js";
import ensureAuthenticated from "../middlewares/Auth/Auth.js";

const router = express.Router();

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);
router.post('/check',ensureAuthenticated,checkAuth);

export default router;