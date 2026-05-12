import { Router } from 'express';
import { dashboardController } from './dashboard.controller';
import { requireAuth } from '../../middleware/auth.middleware';

const router = Router();

router.use(requireAuth); // Protect all routes in this module

router.get('/overview', dashboardController.getOverview);

export default router;
