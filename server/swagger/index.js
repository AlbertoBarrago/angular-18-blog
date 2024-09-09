const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'sMuRt API',
    version: '1.0.0',
    description: 'API for managing articles and users',
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
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
    {
      name: 'Authentication',
      description: 'Authentication endpoints',
    },
  ],
  apis: ['./server/routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
