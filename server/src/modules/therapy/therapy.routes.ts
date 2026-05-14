import { Router } from 'express';
import { therapyController } from './therapy.controller';

const router = Router();

router.get('/categories', therapyController.getTherapyCategories);
router.get('/', therapyController.getTherapySessions);
router.get('/:id', therapyController.getTherapySessionById);

export default router;
