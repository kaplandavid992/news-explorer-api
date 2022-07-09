const authRoutes = require('express').Router();

const loginRouter = require('./loginRoute');
const registerRouter = require('./registerRoute');

authRoutes.use(loginRouter, registerRouter);

module.exports = authRoutes;