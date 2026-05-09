import { Request, Response, NextFunction } from 'express';
import { moodsService } from './moods.service';
import { createMoodSchema, moodIdSchema } from './moods.schema';

export class MoodsController {
  async createMood(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const validatedData = createMoodSchema.parse(req).body;
      const mood = await moodsService.createMood(req.user.id, validatedData);

      res.status(201).json({ success: true, data: mood });
    } catch (error: unknown) {
      const err = error as { name?: string; errors?: unknown[] };
      if (err.name === 'ZodError') {
        return res.status(400).json({ success: false, errors: err.errors });
      }
      next(error);
    }
  }

  async getMoods(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const moods = await moodsService.getMoodsByUserId(req.user.id);
      res.status(200).json({ success: true, data: moods });
    } catch (error) {
      next(error);
    }
  }

  async deleteMood(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const { id } = moodIdSchema.parse(req).params;
      await moodsService.deleteMood(req.user.id, id);

      res.status(200).json({ success: true, message: 'Mood deleted successfully' });
    } catch (error: unknown) {
      const err = error as { name?: string; errors?: unknown[] };
      if (err.name === 'ZodError') {
        return res.status(400).json({ success: false, errors: err.errors });
      }
      next(error);
    }
  }
}

export const moodsController = new MoodsController();
