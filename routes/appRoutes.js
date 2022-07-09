const appRoutes = require('express').Router();

const userRouter = require('./userRoute');
const articleRouter = require('./articleRoute');

appRoutes.use(userRouter, articleRouter);

module.exports = appRoutes;