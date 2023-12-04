require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const morgan = require('morgan');

//middlewares
const connectDB = require('./db/connect');
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

//routers
const authRouter = require('./routes/authRoutes');

app.use(morgan('tiny'));
app.use(express.json());

app.use('/api/v1/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (err) {
    console.log(err);
  }
};

start();
