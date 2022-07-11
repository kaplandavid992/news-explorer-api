const loginRouter = require('express').Router();
const validateEmailPassword = require('../utils/validateEmailPassword');
const { login } = require('../controllers/user');

loginRouter.post('/signin', validateEmailPassword(), login);

module.exports = loginRouter;
