import type { NextFunction, Request, Response } from 'express';
import { dashboardService } from './dashboard.service';

export class DashboardController {
  async getOverview(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const overview = await dashboardService.getDashboardOverview(req.user.id);
      res.status(200).json({ success: true, data: overview });
    } catch (error) {
      next(error);
    }
  }
}

export const dashboardController = new DashboardController();
