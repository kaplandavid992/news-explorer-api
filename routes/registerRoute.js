const registerRouter = require('express').Router();
const validateEmailPasswordName = require('../utils/validateEmailPasswordName');
const { createUser } = require('../controllers/user');

registerRouter.post('/signup', validateEmailPasswordName(), createUser);

module.exports = registerRouter;
