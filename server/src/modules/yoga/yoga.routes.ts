import { Router } from 'express';
import { yogaController } from './yoga.controller';

const router = Router();

router.get('/categories', yogaController.getYogaCategories);
router.get('/levels', yogaController.getYogaLevels);
router.get('/', yogaController.getYogaSessions);
router.get('/:id', yogaController.getYogaSessionById);

export default router;
