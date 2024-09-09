const express = require('express');
const Controller = require('../controllers');
const { verifyToken } = require('../middleware/middleware'); // Import your middleware

const users = express.Router();

/**
 * @swagger
 * /api/createUser:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve a list of articles
 *     description: Retrieve a list of articles from the database without filter
 *     responses:
 *       200:
 *         description: A list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example:  [{
 *                   _id: String,
 *                    title: String,
 *                    author: String,
 *                    shortContent: String,
 *                    content: String,
 *                    createdAt: Date,
 *                    updatedAt: Date,
 *                  }]
 */
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
