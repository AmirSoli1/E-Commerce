require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connect = require('./db/connect');
const errorHandler = require('./middleware/error-handler');

app.use(express.json());
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Home Page');
});

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
