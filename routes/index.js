const routes = require('express').Router();

const userRouter = require('./userRoute');
const articleRouter = require('./articleRoute');
const authRoutes = require('./authRoutes');

routes.use(userRouter, articleRouter, authRoutes);

module.exports = routes;
