require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const port = process.env.DATABASE_PORT || 3000;
const dbName = process.env.DATABASE_NAME || 'test';
const articleRoutes = require('./routes/articles');
const usersRoutes = require('./routes/users');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

mongoose
  .connect(mongoString, {
    dbName: dbName,
  })
  .then(r => null);
mongoose.connection.on('error', error => {
  console.log(error);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', articleRoutes);
app.use('/api/users', usersRoutes);

// Swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`🚀 Server Started on port:${port}`);
});
