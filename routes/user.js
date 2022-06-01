const express = require('express');
const authValidation = require('../middleware/auth');

const Users = require('../services/usersercices');

const users = (app) => {
  const router = express.Router();

  app.use('/api/users', router);

  router.get('/', authValidation(2), (req, res) => {
    console.log(req.cookies);
    return res.json({
      success: true,
    });
  });
};

module.exports = users;
