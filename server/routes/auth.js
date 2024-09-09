const express = require('express');
const Controller = require('../controllers');
const { verifyToken } = require('../middleware/middleware');

const auth = express.Router();

/**
 * @swagger
 * /api/auth/login:
 *   get:
 *     tags: [Authentication]
 *     summary: Login
 *     description: Login to the application by providing a username and password
 *     responses:
 *       200:
 *         description: A list of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:  {
 *                 auth: boolean,
 *                 token: String,
 *                 user: {
 *                   _id: String,
 *                   username: String,
 *                   password: String,
 *                   email: String,
 *                   role: String,
 *                   createdAt: Date,
 *                 }
 *               }
 */
auth.post('/login', async (req, res) => {
  await Controller.login(req, res);
});

module.exports = auth;
