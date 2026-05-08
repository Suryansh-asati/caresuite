import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { registerSchema, loginSchema } from './auth.schema';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = registerSchema.parse(req).body;
      const result = await authService.register(validatedData);

      res.status(201).json({
        success: true,
        data: result,
      });
    } catch (error: unknown) {
      const err = error as { name?: string; message?: string; errors?: unknown[] };
      // If zod error, structure it, else pass to error handler
      if (err.name === 'ZodError') {
        return res.status(400).json({ success: false, errors: err.errors });
      }
      if (err.message === 'Email is already registered') {
        return res.status(409).json({ success: false, message: err.message });
      }
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = loginSchema.parse(req).body;
      const result = await authService.login(validatedData);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error: unknown) {
      const err = error as { name?: string; message?: string; errors?: unknown[] };
      if (err.name === 'ZodError') {
        return res.status(400).json({ success: false, errors: err.errors });
      }
      if (err.message === 'Invalid email or password') {
        return res.status(401).json({ success: false, message: err.message });
      }
      next(error);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const user = await authService.getMe(req.user.id);

      res.status(200).json({
        success: true,
        data: { user },
      });
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
