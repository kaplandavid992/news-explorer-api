const authRoutes = require('express').Router();

const loginRouter = require('./routes/loginRoute');
const registerRouter = require('./routes/registerRoute');

authRoutes.use(loginRouter, registerRouter);

module.exports = authRoutes;