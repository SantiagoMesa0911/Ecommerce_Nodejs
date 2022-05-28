const jwt = require('jsonwebtoken');
const jwtsecret = require('../config');

const validateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'A token is required for this process',
    });
  }

  return handleToken(token, req, res, next);
};
