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
    } catch (error: any) {
      // If zod error, structure it, else pass to error handler
      if (error.name === 'ZodError') {
        return res.status(400).json({ success: false, errors: error.errors });
      }
      if (error.message === 'Email is already registered') {
        return res.status(409).json({ success: false, message: error.message });
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
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({ success: false, errors: error.errors });
      }
      if (error.message === 'Invalid email or password') {
        return res.status(401).json({ success: false, message: error.message });
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
