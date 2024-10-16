require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const port = process.env.DATABASE_PORT || 3000;
const dbName = process.env.DATABASE_NAME || 'test';
const articleRoutes = require('./routes/articles');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

mongoose
  .connect(mongoString, {
    dbName: dbName,
  })
  .then(() => null);
mongoose.connection.on('error', error => {
  console.log(error);
});

app.use(
  cors({
    origin: [
      'http://localhost:4200',
      'https://angular-18-blog.onrender.com',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', articleRoutes);
app.use('/api', usersRoutes);
app.use('/api/auth', authRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`🚀 Server Started on port:${port}`);
});
