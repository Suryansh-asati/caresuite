import type { NextFunction, Request, Response } from 'express';
import { createJournalSchema, journalIdSchema, updateJournalSchema } from './journal.schema';
import { journalService } from './journal.service';

type AuthenticatedRequest = Request & {
  user?: {
    id: string;
  };
};

export class JournalController {
  async createEntry(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const validatedData = createJournalSchema.parse(req).body;
      const newEntry = await journalService.createEntry(
        (req as AuthenticatedRequest).user.id,
        validatedData
      );

      res.status(201).json({
        success: true,
        data: newEntry,
      });
    } catch (error: unknown) {
      const err = error as { name?: string; errors?: unknown[] };
      if (err.name === 'ZodError') {
        return res.status(400).json({ success: false, errors: err.errors });
      }
      next(error);
    }
  }

  async getEntries(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const entries = await journalService.getUserEntries(req.user.id);

      res.status(200).json({
        success: true,
        data: entries,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateEntry(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const { id } = journalIdSchema.parse(req).params;
      const validatedData = updateJournalSchema.parse(req).body;
      const updatedEntry = await journalService.updateEntry(id, req.user.id, validatedData);

      res.status(200).json({
        success: true,
        data: updatedEntry,
      });
    } catch (error: unknown) {
      const err = error as { name?: string; errors?: unknown[] };
      if (err.name === 'ZodError') {
        return res.status(400).json({ success: false, errors: err.errors });
      }
      next(error);
    }
  }

  async deleteEntry(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const { id } = journalIdSchema.parse(req).params;
      await journalService.deleteEntry(id, req.user.id);

      res.status(200).json({
        success: true,
        message: 'Journal entry deleted successfully',
      });
    } catch (error: unknown) {
      const err = error as { name?: string; errors?: unknown[] };
      if (err.name === 'ZodError') {
        return res.status(400).json({ success: false, errors: err.errors });
      }
      next(error);
    }
  }
}

export const journalController = new JournalController();
