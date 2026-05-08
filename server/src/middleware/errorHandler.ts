import { Request, Response } from 'express';

export const errorHandler = (
  err: Error & { statusCode?: number },
  _req: Request,
  res: Response
): void => {
  // eslint-disable-next-line no-console
  console.error(err);

  const statusCode = ((err as Record<string, unknown>).statusCode as number) || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
