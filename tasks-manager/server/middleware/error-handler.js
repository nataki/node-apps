const errorHandlerMiddleware = (err, req, res, next) =>
  res.status(500).json({ success: false, msg: err.message || 'Server error' });

module.exports = errorHandlerMiddleware;
