import type { NextFunction, Request, Response } from 'express';
import { createWorkoutSchema, updateWorkoutSchema, workoutIdSchema } from './workouts.schema';
import { workoutsService } from './workouts.service';

export class WorkoutsController {
  async createWorkout(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const validatedData = createWorkoutSchema.parse(req).body;
      const workout = await workoutsService.createWorkout(req.user.id, validatedData);

      res.status(201).json({ success: true, data: workout });
    } catch (error: unknown) {
      const err = error as { name?: string; errors?: unknown[] };
      if (err.name === 'ZodError') {
        return res.status(400).json({ success: false, errors: err.errors });
      }

      next(error);
    }
  }

  async getWorkouts(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const workouts = await workoutsService.getWorkoutsByUserId(req.user.id);

      res.status(200).json({ success: true, data: workouts });
    } catch (error) {
      next(error);
    }
  }

  async getWorkout(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const { id } = workoutIdSchema.parse(req).params;
      const workout = await workoutsService.getWorkoutById(id, req.user.id);

      res.status(200).json({ success: true, data: workout });
    } catch (error: unknown) {
      const err = error as { name?: string; errors?: unknown[] };
      if (err.name === 'ZodError') {
        return res.status(400).json({ success: false, errors: err.errors });
      }

      next(error);
    }
  }

  async updateWorkout(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const { id } = workoutIdSchema.parse(req).params;
      const validatedData = updateWorkoutSchema.parse(req).body;
      const workout = await workoutsService.updateWorkout(id, req.user.id, validatedData);

      res.status(200).json({ success: true, data: workout });
    } catch (error: unknown) {
      const err = error as { name?: string; errors?: unknown[] };
      if (err.name === 'ZodError') {
        return res.status(400).json({ success: false, errors: err.errors });
      }

      next(error);
    }
  }

  async deleteWorkout(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const { id } = workoutIdSchema.parse(req).params;
      await workoutsService.deleteWorkout(id, req.user.id);

      res.status(200).json({ success: true, message: 'Workout session deleted successfully' });
    } catch (error: unknown) {
      const err = error as { name?: string; errors?: unknown[] };
      if (err.name === 'ZodError') {
        return res.status(400).json({ success: false, errors: err.errors });
      }

      next(error);
    }
  }
}

export const workoutsController = new WorkoutsController();
