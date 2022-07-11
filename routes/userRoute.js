const userRouter = require('express').Router();
const { getLoggedInUser } = require('../controllers/user');
const auth = require('../middlewares/auth');

userRouter.get('/users/me', auth, getLoggedInUser);

module.exports = userRouter;
