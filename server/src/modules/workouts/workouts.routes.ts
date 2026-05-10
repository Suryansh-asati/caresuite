import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware';
import { workoutsController } from './workouts.controller';

const router = Router();

router.use(requireAuth);

router.post('/', workoutsController.createWorkout);
router.get('/', workoutsController.getWorkouts);
router.get('/:id', workoutsController.getWorkout);
router.put('/:id', workoutsController.updateWorkout);
router.delete('/:id', workoutsController.deleteWorkout);

export default router;
