const appRoutes = require('express').Router();

const userRouter = require('./routes/userRoute');
const articleRouter = require('./routes/articleRoute');

appRoutes.use(userRouter, articleRouter);

module.exports = appRoutes;