require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const port = process.env.DATABASE_PORT || 3000;
const dbName = process.env.DATABASE_NAME || 'test';
const routes = require('./routes');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

mongoose
  .connect(mongoString, {
    dbName: dbName,
  })
  .then(r => console.log(r.now()));
mongoose.connection.on('error', error => {
  console.log(error);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);

app.listen(port, () => {
  console.log(`🚀 Server Started on port:${port}`);
});
