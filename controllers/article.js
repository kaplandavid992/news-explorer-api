const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getArticles = async (req, res, next) => {
  await Article.find({})
    .orFail(() => {
      throw new NotFoundError('No Articles found');
    })
    .then((Articles) => res.send(Articles))
    .catch((err) => next(err));
};

const saveArticle = async (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  const owner = req.user._id;
  await Article.create({
    keyword, title, text, date, source, link, image, owner
  })
    .then((Article) => {
      res.send(Article);
    })
    .catch((err) => {
      next(err);
    });
};

const deleteArticle = async (req, res, next) => {
  await Article.findOne({ _id: req.params.ArticleId })
    .orFail(() => new NotFoundError("Can't delete non exisiting Article"))
    .then((Article) => {
      const ownerId = Article.owner.toString();
      if (ownerId !== req.user._id) {
        throw new ForbiddenError('Forbidden');
      }
      return Article.findOneAndDelete(req.params.ArticleId)
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
