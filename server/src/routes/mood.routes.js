import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware.js';
// import { getMoods, createMood } from '../controllers/mood.controller.js';

const router = Router();

// router.use(requireAuth); // Protect all mood routes
// router.get('/', getMoods);
// router.post('/', createMood);

export default router;
