import express from 'express';
import { getSkills, addSkill } from '../controllers/skillController.js';
import ensureAuthenticated from '../middlewares/Auth/Auth.js';
const router = express.Router();

router.get('/', getSkills);
router.post('/', ensureAuthenticated, addSkill);

export default router;
