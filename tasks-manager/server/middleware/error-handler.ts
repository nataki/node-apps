import type { ErrorRequestHandler } from 'express';

const isDev = process.env.NODE_ENV !== 'production';

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, msg: isDev ? (err.message || 'Server error') : 'Server error' });
};

export default errorHandlerMiddleware;
