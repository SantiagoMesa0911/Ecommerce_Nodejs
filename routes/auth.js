const express = require('express');
const passport = require('passport');
const { authResponse, deleteCookie, providerResponse } = require('../helpers/authResponse');
const authValidation = require('../middleware/auth');
const UserModel = require('../models/user');
const Auth = require('../services/authservices');

const auth = (app) => {
  const router = express.Router();
  const AuthServ = new Auth();

  app.use('/api/auth', router);

  router.post('/login', async (req, res) => {
    const result = await AuthServ.login(req.body);
    return authResponse(res, result, 401);
  });
  router.post('/signup', async (req, res) => {
    const result = await AuthServ.signup(req.body);
    return authResponse(res, result, 400);
  });

  router.get('/logout', (req, res) => {
    return deleteCookie(res);
  });

  router.get('/validate', authValidation(1), (req, res) => {
    return res.json({
      success: true,
      user: req.user
    })
  })

  router.get("/google", passport.authenticate("google", {
    scope: ["email", "profile"]
  }))

  router.get("/google/callback", passport.authenticate("google", { session: false }), async (req, res) => {
    const user = req.user.profile
    console.log(user)
    const result = await AuthServ.sociallogin(user)
    return providerResponse(res, result, 401);
  })

  router.get("/facebook", passport.authenticate("facebook", {
    scope: ['email']
  }))

  router.get("/facebook/callback", passport.authenticate("facebook", { session: false }), async (req, res) => {
    const user = req.user.profile
    console.log(user)
    const result = await AuthServ.sociallogin(user)
    return providerResponse(res, result, 401);
  })
  router.get("/twitter", passport.authenticate("twitter", { scope: ['email'] }))

  router.get("/twitter/callback", passport.authenticate("twitter", { session: false }), async (req, res) => {
    const user = req.user.profile
    console.log(user)
    const result = await AuthServ.sociallogin(user)
    return providerResponse(res, result, 401);
  })
};

module.exports = auth;
