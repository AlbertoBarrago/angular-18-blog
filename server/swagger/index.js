const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Article API',
    version: '1.0.0',
    description: 'API for managing articles and users',
  },
};

const options = {
  swaggerDefinition,
  tags: [
    {
      name: 'Articles',
      description: 'Article management endpoints',
    },
    {
      name: 'Users',
      description: 'User management endpoints',
    },
  ],
  apis: ['./server/routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
