const { celebrate, Joi } = require('celebrate');

const validateEmailPasswordName = () => celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(8).required(),
    name: Joi.string().min(2).max(30).required(),
  }),
});

module.exports = validateEmailPasswordName;
