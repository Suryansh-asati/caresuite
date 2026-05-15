import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { yogaService } from './yoga.service';
import { listYogaSchema, yogaIdSchema } from './yoga.validation';

export class YogaController {
  async getYogaSessions(req: Request, res: Response, next: NextFunction) {
    try {
      const query = listYogaSchema.parse(req).query;
      const sessions = await yogaService.getYogaSessions(query);

      res.status(200).json({ success: true, data: sessions });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json({ success: false, errors: error.issues });
      }

      next(error);
    }
  }

  async getYogaSessionById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = yogaIdSchema.parse(req).params;
      const session = await yogaService.getYogaSessionById(id);

      res.status(200).json({ success: true, data: session });
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        return res.status(400).json({ success: false, errors: error.issues });
      }

      next(error);
    }
  }

  async getYogaCategories(_req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await yogaService.getYogaCategories();

      res.status(200).json({ success: true, data: categories });
    } catch (error) {
      next(error);
    }
  }

  async getYogaLevels(_req: Request, res: Response, next: NextFunction) {
    try {
      const levels = await yogaService.getYogaLevels();

      res.status(200).json({ success: true, data: levels });
    } catch (error) {
      next(error);
    }
  }
}

export const yogaController = new YogaController();
