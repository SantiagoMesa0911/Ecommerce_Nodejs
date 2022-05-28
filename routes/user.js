const express = require('express');

const Users = require('../services/usersercices');

const users = (app) => {
  const userServie = new Users();
  const router = express.Router();

  app.use('/api/users', router);

  router.get('/', async (req, res) => {
    const users = await userServie.getAll();
    console.log(req.cookies);
    res.status(200).json({ message: 'Successful request', users });
  });

  router.post('/post', async (req, res) => {
    const user = await userServie.createUser(req.body);

    res.status(200).json({ message: 'Successful request', user });
  });
};

module.exports = users;
