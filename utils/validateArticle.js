const { celebrate, Joi } = require('celebrate');

const validateArticle = () => celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required().min(2),
    source: Joi.string().required(),
    link: Joi.string().required(),
    image: Joi.string().required(),
    date: Joi.string().required(),
  }),
});

module.exports = validateArticle;
