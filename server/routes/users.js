const express = require('express');
const Controller = require('../controllers');
const { verifyToken } = require('../middleware/middleware'); // Import your middleware

const users = express.Router();

//USERS CONTROLLER
users.post('/createUser', verifyToken, async (req, res) => {
  await Controller.createUser(req, res);
});

users.get('/getAllUsers', verifyToken, async (req, res) => {
  await Controller.getAllUsers(req, res);
});

users.get('/getOneUser/:id', verifyToken, async (req, res) => {
  await Controller.getOneUser(req, res, req.params.id);
});

users.post('/login', async (req, res) => {
  await Controller.login(req, res);
});

module.exports = users;
