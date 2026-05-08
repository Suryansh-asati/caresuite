import { Router } from 'express';
import { moodsController } from './moods.controller';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();

router.use(requireAuth); // Protect all routes in this module

router.post('/', moodsController.createMood);
router.get('/', moodsController.getMoods);
router.delete('/:id', moodsController.deleteMood);

export default router;
