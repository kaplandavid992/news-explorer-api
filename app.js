const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const auth = require('./middlewares/auth');
const appRoutes = require('./routes/appRoutes');
const { limiter } = require('./middlewares/limiter');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(limiter);
app.options('*', cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(requestLogger);

const { PORT = 3000, NODE_ENV, DB_ADDRESS } = process.env;
mongoose.connect(NODE_ENV === 'production' ? DB_ADDRESS : 'mongodb://localhost:27017/newsexplorerdevdb');

const route = (req, res) => {
  throw new NotFoundError('Requested Resource Not found', 404);
};

app.use(authRoutes);
app.use(auth);
app.use(appRoutes);
app.use('*', route);

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 && !message
      ? 'An error occurred on the server'
      : message,
  });
});
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
