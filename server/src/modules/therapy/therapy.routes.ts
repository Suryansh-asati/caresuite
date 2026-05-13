import { Router } from 'express';
import { therapyController } from './therapy.controller';

const router = Router();

// Public routes - therapy content is accessible to everyone
// Order matters: more specific routes must come before generic :id route
router.get('/', therapyController.getTherapySessions);
router.get('/categories', therapyController.getTherapyCategories);
router.get('/:id', therapyController.getTherapySessionById);

export default router;
