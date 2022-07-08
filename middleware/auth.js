const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;
const handleAuthError = () => {
  throw new UnauthorizedError('Authorization Error');
};
const extractBearerToken = (header) => header.replace('Bearer ', '');
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    handleAuthError();
  }
  const token = extractBearerToken(authorization);

  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
    );
    if (!payload) {
      handleAuthError();
    }
  } catch (err) {
    next(err);
  }
  req.user = payload;
  return next();
};
