import { Router } from 'express';
import { requireAuth } from '../../middleware/auth.middleware';
import { journalController } from './journal.controller';

const router = Router();

router.use(requireAuth);

router.post('/', journalController.createEntry);
router.get('/', journalController.getEntries);
router.put('/:id', journalController.updateEntry);
router.delete('/:id', journalController.deleteEntry);

export default router;
