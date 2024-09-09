const express = require('express');
const Controller = require('../controllers');
const { verifyToken } = require('../middleware/middleware');

const users = express.Router();

users.get('/users', verifyToken, async (req, res) => {
  await Controller.getAllUsers(req, res);
});

users.get('/users/:id', verifyToken, async (req, res) => {
  await Controller.getOneUser(req, res, req.params.id);
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users from the database without filter (token required)
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example:  [{
 *                  _id: String,
 *                  username: String,
 *                  password: String,
 *                  email: String,
 *                  role: String,
 *                  createdAt: Date,
 *                  updatedAt: Date,
 *                }]
 */
users.post('/users', verifyToken, async (req, res) => {
  await Controller.createUser(req, res);
});

users.put('/users/:id', verifyToken, async (req, res) => {
  await Controller.updateUser(req, res, req.params.id);
});

users.delete('/users/:id', verifyToken, async (req, res) => {
  await Controller.removeUser(req, res, req.params.id);
});

module.exports = users;
