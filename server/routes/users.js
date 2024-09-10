const express = require('express');
const Controller = require('../controllers');
const { verifyToken } = require('../middleware/middleware');

const users = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve a list of users
 *     description: Retrieve a list of users from the database
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
 *                }]
 */
users.get('/users', verifyToken, async (req, res) => {
  await Controller.getAllUsers(req, res);
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Retrieve one user by id
 *     description: Retrieve one user by id from the database without filter
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
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
 *                }]
 */
users.get('/users/:id', verifyToken, async (req, res) => {
  await Controller.getOneUser(req, res, req.params.id);
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags: [Users]
 *     summary: Create a new user
 *     description: Create a new user in the database
 *     parameters:
 *       - in: body
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               required: true
 *               description: The username of the user
 *               example: 'John Doe'
 *             password:
 *               type: string
 *               required: true
 *               description: The password
 *               example: '123456'
 *             email:
 *               type: string
 *               required: true
 *               description: The email
 *               example: 'john.doe@example.com'
 *             role:
 *               type: string
 *               required: true
 *               description: The role
 *               example: 'ADMIN'
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

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     tags: [Users]
 *     summary: Update a new user
 *     description: Update a new user in the database
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: ID of the user to update
 *       - in: body
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *               required: true
 *               description: The username of the user
 *               example: 'John Doe'
 *             password:
 *               type: string
 *               required: true
 *               description: The password
 *               example: '123456'
 *             email:
 *               type: string
 *               required: true
 *               description: The email
 *               example: 'john.doe@example.com'
 *             role:
 *               type: string
 *               required: true
 *               description: The role
 *               example: 'ADMIN'
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
users.patch('/users/:id', verifyToken, async (req, res) => {
  await Controller.updateUser(req, res, req.params.id);
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete a new user
 *     description: Delete user in the database
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           required: true
 *           description: ID of the user to update
 *     responses:
 *       200:
 *         description: User deleted with id 123456 successfully
 *       404:
 *        description: User not found
 */
users.delete('/users/:id', verifyToken, async (req, res) => {
  await Controller.removeUser(req, res, req.params.id);
});

module.exports = users;
