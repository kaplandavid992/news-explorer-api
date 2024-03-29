const rateLimit = require('express-rate-limit');
const ForbiddenError = require('../errors/ForbiddenError');

exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: () => {
    throw new ForbiddenError('Requests limit reached, try again later');
  },
});
