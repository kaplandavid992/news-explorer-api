const { celebrate, Joi } = require('celebrate');

const validateEmailPassword = () => {
  return celebrate({
    body: Joi.object().keys({
      email: Joi.string().min(3).required().email(),
      password: Joi.string().min(8).required(),
    }),
  });
}

module.exports = validateEmailPassword;