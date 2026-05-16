import { Request, Response } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error & { statusCode?: number },
  _req: Request,
  res: Response
): void => {
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      errors: err.issues,
    });
    return;
  }

  // eslint-disable-next-line no-console
  console.error(err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
