const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const User = require('../models/user');
const ERROR_MESSAGES = require('../constants/errorMessages');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getLoggedInUser = async (req, res, next) => {
  await User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ERROR_MESSAGES.userNotFound);
      }
      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, password,
  } = req.body;
  let email;
  if (!validator.isEmail(req.body.email)) {
    email = null;
  } else {
    email = req.body.email;
  }
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(ERROR_MESSAGES.userExists);
      }
      return bcrypt.hash(password, 10);
    }).then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then(() => res.status(200).send({
      email, name,
    }))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new UnauthorizedError(ERROR_MESSAGES.unauthorized);
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        {
          _id: user._id,
        },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  login,
  createUser,
  getLoggedInUser,
};
