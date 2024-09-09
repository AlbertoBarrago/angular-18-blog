const express = require('express');
const Controller = require('../controllers');
const { verifyToken } = require('../middleware/middleware'); // Import your middleware

const articles = express.Router();

/**
 * @swagger
 * /api/articles:
 *   get:
 *     tags: [Articles]
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
articles.get('/articles', async (req, res) => {
  await Controller.getAll(req, res);
});

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     tags: [Articles]
 *     summary: Retrieve one article by id
 *     description: Retrieve one article by id from the database without filter
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the article to update
 *     responses:
 *       200:
 *         description: A one article by id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:  {
 *                   _id: String,
 *                    title: String,
 *                    author: String,
 *                    shortContent: String,
 *                    content: String,
 *                    createdAt: Date,
 *                    updatedAt: Date,
 *                  }
 $ref: '#/components/schemas/models/Article'
 */
articles.get('/articles/:id', async (req, res) => {
  await Controller.getOne(req, res, req.params.id);
});

/**
 /**
 * @swagger
 * /api/articles/{page}/{size}/{filter}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags: [Articles]
 *     summary: Filter articles by user token
 *     description: Filter articles from the database
 *     parameters:
 *       - in: path
 *         name: page
 *         schema:
 *           type: string
 *           required: true
 *         description: Page number
 *
 *       - in: path
 *         name: size
 *         schema:
 *           type: string
 *           required: true
 *         description: Size of the page
 *
 *       - in: path
 *         name: filter
 *         schema:
 *           type: string
 *           required: false
 *         description: title, content, author, or shortContent
 *     responses:
 *       200:
 *         description: Successfully filtered articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example:  [{
 *                 _id: String,
 *                 title: String,
 *                 author: String,
 *                 shortContent: String,
 *                 content: String,
 *                 createdAt: Date,
 *                 updatedAt: Date,
 *               }]
 *       500:
 *         description: Internal server error
 */
articles.get('/articles/:page/:size/:q', verifyToken, async (req, res) => {
  await Controller.filterArticleByQuery(req, res);
});

/**
 * @swagger
 * /api/articles:
 *   post:
 *     tags: [Articles]
 *     summary: Create articles
 *     description: Create articles from the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               shortContent:
 *                 type: string
 *               content:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Successfully created articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example:  [{
 *                 _id: String,
 *                 title: String,
 *                 author: String,
 *                 shortContent: String,
 *                 content: String,
 *                 createdAt: Date,
 *                 updatedAt: Date,
 *               }]
 *       500:
 *         description: Internal server error
 */
articles.post('/articles', async (req, res) => {
  await Controller.create(req, res);
});

/**
 * @swagger
 * /api/articles/{id}:
 *   patch:
 *     tags: [Articles]
 *     summary: Update one article by id
 *     description: Update one article by id from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the article to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               shortContent:
 *                 type: string
 *               content:
 *                 type: string
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *               updatedAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Successfully updated article
 *       404:
 *         description: Article not found
 */
articles.patch('/articles/:id', async (req, res) => {
  await Controller.update(req, res, req.params.id);
});

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     tags: [Articles]
 *     summary: Delete one article by id
 *     description: Delete one article by id from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the article to update
 *     responses:
 *       200:
 *         description: Successfully deleted article
 *       404:
 *         description: Article not found
 */
articles.delete('/articles/:id', async (req, res) => {
  await Controller.remove(req, res, req.params.id);
});

module.exports = articles;
