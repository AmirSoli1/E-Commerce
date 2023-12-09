const { UnauthenticatedError, UnautherizedError } = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new UnauthenticatedError('Authentication Invalid');
  }

  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (err) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnautherizedError('Unautherized to access this route');
    }
    next();
  };
};

module.exports = { authenticateUser, authorizePermissions };
