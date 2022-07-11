const Article = require('../models/article');
const ERROR_MESSAGES = require('../constants/errorMessages');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getArticles = async (req, res, next) => {
  await Article.find({})
    .orFail(() => {
      throw new NotFoundError(ERROR_MESSAGES.articlesNotFound);
    })
    .then((Articles) => res.send(Articles))
    .catch((err) => next(err));
};

const saveArticle = async (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;
  await Article.create({
    keyword, title, text, date, source, link, image, owner,
  })
    .then((Article) => {
      res.send(Article);
    })
    .catch((err) => {
      next(err);
    });
};

const deleteArticle = async (req, res, next) => {
  await Article.findById(req.params.articleId)
    .orFail(() => new NotFoundError(ERROR_MESSAGES.articleNotFound))
    .then((Article) => {
      const ownerId = Article.owner.toString();
      if (ownerId !== req.user._id) {
        throw new ForbiddenError(ERROR_MESSAGES.forbidden);
      }
      return Article.deleteOne(Article)
        .then((ArticleDeleted) => res.send({ data: ArticleDeleted }))
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  getArticles,
  saveArticle,
  deleteArticle,
};
