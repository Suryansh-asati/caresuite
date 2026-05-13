import { Request, Response, NextFunction } from 'express';
import { therapyService } from './therapy.service';
import { therapyIdSchema, therapyFiltersSchema } from './therapy.validation';

export class TherapyController {
  /**
   * Get all therapy sessions with optional category filter
   * GET /api/therapy
   */
  async getTherapySessions(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedQuery = therapyFiltersSchema.parse(req);
      const { category, limit, offset } = validatedQuery.query;

      const sessions = await therapyService.getTherapySessions({
        category,
        limit,
        offset,
      });

      const total = await therapyService.getTherapySessionCount(category);

      res.status(200).json({
        success: true,
        data: sessions,
        pagination: {
          total,
          limit: limit || 50,
          offset: offset || 0,
        },
      });
    } catch (error: unknown) {
      const err = error as { name?: string; errors?: unknown[] };
      if (err.name === 'ZodError') {
        return res.status(400).json({ success: false, errors: err.errors });
      }
      next(error);
    }
  }

  /**
   * Get a specific therapy session by ID
   * GET /api/therapy/:id
   */
  async getTherapySessionById(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedParams = therapyIdSchema.parse(req);
      const { id } = validatedParams.params;

      const session = await therapyService.getTherapySessionById(id);

      if (!session) {
        return res.status(404).json({
          success: false,
          message: 'Therapy session not found',
        });
      }

      res.status(200).json({
        success: true,
        data: session,
      });
    } catch (error: unknown) {
      const err = error as { name?: string; errors?: unknown[] };
      if (err.name === 'ZodError') {
        return res.status(400).json({ success: false, errors: err.errors });
      }
      next(error);
    }
  }

  /**
   * Get all available therapy categories
   * GET /api/therapy/categories
   */
  async getTherapyCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await therapyService.getTherapyCategories();

      res.status(200).json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const therapyController = new TherapyController();
