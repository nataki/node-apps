import type { ErrorRequestHandler } from 'express';

const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) =>
  res.status(500).json({ success: false, msg: err.message || 'Server error' });

export default errorHandlerMiddleware;
