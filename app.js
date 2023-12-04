require('dotenv').config();

const express = require('express');
const app = express();

const connect = require('./db/connect');

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connect(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
