export const errorHandler = (err, req, res, next) => {
  if (err?.name === 'ZodError') {
    return res.status(400).json({
      success: false,
      errors: err.issues ?? err.errors,
    });
  }

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
