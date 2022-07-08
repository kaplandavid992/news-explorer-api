const userRouter = require('express').Router();
const { getLoggedInUser } = require('../controllers/user');

userRouter.get('/users/me', getLoggedInUser);

module.exports = userRouter;
