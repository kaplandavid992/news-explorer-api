const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { centralErrorsHandler } = require('./errors/centralErrorsHandler');
const routes = require('./routes/index');
const { limiter } = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(requestLogger);
app.use(limiter);
app.options('*', cors());
app.use(helmet());
app.use(bodyParser.json());

const { PORT = 3000, NODE_ENV, DB_ADDRESS } = process.env;
mongoose.connect(NODE_ENV === 'production' ? DB_ADDRESS : 'mongodb://localhost:27017/newsexplorerdevdb');

const route = (req, res) => {
  throw new NotFoundError('Requested Resource Not found', 404);
};

app.use(routes);
app.use('*', route);
app.use(errorLogger);
app.use(errors());
app.use(centralErrorsHandler);
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
