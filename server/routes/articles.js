const express = require('express');
const Controller = require('../controllers');
const { verifyToken } = require('../middleware/middleware'); // Import your middleware

const articles = express.Router();

/**
 * @swagger
 * /api/getAll:
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
 * $ref: '#/components/schemas/models/Article'
 */
articles.get('/getAll', async (req, res) => {
  await Controller.getAll(req, res);
});

/**
 * @swagger
 * /api/getOne/{id}:
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
articles.get('/getOne/:id', async (req, res) => {
  await Controller.getOne(req, res, req.params.id);
});

/**
 /**
 * @swagger
 * /api/filter/{page}/{size}:
 *   post:
 *     tags: [Articles]
 *     summary: Filter articles
 *     description: Filter articles from the database
 *     parameters:
 *       - in: path
 *         name: size
 *         schema:
 *           type: string
 *           required: true
 *         description: Size of the page
 *       - in: path
 *         name: page
 *         schema:
 *           type: string
 *           required: true
 *         description: Page number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               q:
 *                 type: string
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
articles.post('/filter/:page/:size', async (req, res) => {
  await Controller.filterArticleByQuery(req, res);
});

/**
 * @swagger
 * /api/create:
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
articles.post('/create', async (req, res) => {
  await Controller.create(req, res);
});

/**
 * @swagger
 * /api/update/{id}:
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
articles.patch('/update/:id', async (req, res) => {
  await Controller.update(req, res, req.params.id);
});

/**
 * @swagger
 * /api/delete/{id}:
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
articles.delete('/delete/:id', async (req, res) => {
  await Controller.remove(req, res, req.params.id);
});

module.exports = articles;
