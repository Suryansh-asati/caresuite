import type { NextFunction, Request, Response } from 'express';
import { therapyService } from './therapy.service';
import { listTherapySchema, therapyIdSchema } from './therapy.validation';

export class TherapyController {
  async getTherapySessions(req: Request, res: Response, next: NextFunction) {
    try {
      const query = listTherapySchema.parse(req).query;
      const sessions = await therapyService.getTherapySessions(query);

      res.status(200).json({ success: true, data: sessions });
    } catch (error: unknown) {
      const err = error as { name?: string; errors?: unknown[] };
      if (err.name === 'ZodError') {
        return res.status(400).json({ success: false, errors: err.errors });
      }

      next(error);
    }
  }

  async getTherapySessionById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = therapyIdSchema.parse(req).params;
      const session = await therapyService.getTherapySessionById(id);

      res.status(200).json({ success: true, data: session });
    } catch (error: unknown) {
      const err = error as { name?: string; errors?: unknown[] };
      if (err.name === 'ZodError') {
        return res.status(400).json({ success: false, errors: err.errors });
      }

      next(error);
    }
  }

  async getTherapyCategories(_req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await therapyService.getTherapyCategories();

      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      next(error);
    }
  }
}

export const therapyController = new TherapyController();
