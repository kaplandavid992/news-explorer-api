const registerRouter = require('express').Router();
const  validateEmailPassword  = require('../utils/validateEmailPassword');
const { createUser } = require('../controllers/user');

registerRouter.post('/signin',validateEmailPassword(), createUser);

module.exports = registerRouter;
