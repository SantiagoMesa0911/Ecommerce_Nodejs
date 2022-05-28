const express = require('express');
const { authResponse, deleteCookie } = require('../helpers/authResponse');
const UserModel = require('../models/user');
const Auth = require('../services/authservices');

const auth = (app) => {
  const router = express.Router();
  const AuthServ = new Auth();
  app.use('/api/auth', router);

  router.post('/signup', async (req, res) => {
    const user = await AuthServ.signup(req.body);
    authResponse(res, user, 400);
  });

  router.post('/login', async (req, res) => {
    const user = await AuthServ.login(req.body);

    authResponse(res, user, 401);
  });

  router.get('/logout', (req, res) => {
    return deleteCookie(res);
  });
};

module.exports = auth;
