const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200
    ? res.statusCode
    : 500;

  // Log all 500-level errors; skip 4xx client errors for noise reduction
  if (statusCode >= 500) {
    logger.error('%s %s — %s', req.method, req.originalUrl, err.message, {
      stack: err.stack,
    });
  } else {
    logger.warn('%s %s — %s', req.method, req.originalUrl, err.message);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
};

module.exports = { errorHandler };
