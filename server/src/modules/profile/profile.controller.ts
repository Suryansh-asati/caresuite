import type { NextFunction, Request, Response } from 'express';
import { profileService } from './profile.service';
import { profilePasswordSchema, profileUpdateSchema } from './profile.validation';

export class ProfileController {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const profile = await profileService.getProfile(req.user.id);

      res.status(200).json({
        success: true,
        data: { profile },
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const validatedData = profileUpdateSchema.parse({ body: req.body }).body;
      const profile = await profileService.updateProfile(req.user.id, validatedData);

      res.status(200).json({
        success: true,
        data: { profile },
      });
    } catch (error: unknown) {
      next(error);
    }
  }

  async updatePassword(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const validatedData = profilePasswordSchema.parse({ body: req.body }).body;
      await profileService.updatePassword(req.user.id, validatedData);

      res.status(200).json({
        success: true,
        data: { message: 'Password updated successfully' },
      });
    } catch (error: unknown) {
      next(error);
    }
  }
}

export const profileController = new ProfileController();
