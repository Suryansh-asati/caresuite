import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware';
import { profileController } from './profile.controller';

const router = Router();

router.use(requireAuth);

router.get('/', profileController.getProfile);
router.patch('/', profileController.updateProfile);
router.patch('/password', profileController.updatePassword);

export default router;
