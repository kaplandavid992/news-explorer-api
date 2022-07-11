const articleRouter = require('express').Router();
const validateArticle = require('../utils/validateArticle');
const auth = require('../middlewares/auth');
const { getArticles, saveArticle, deleteArticle } = require('../controllers/article');

articleRouter.get('/articles', auth, getArticles);
articleRouter.post('/articles', auth, validateArticle(), saveArticle);
articleRouter.delete('/articles/:articleId', auth, deleteArticle);

module.exports = articleRouter;
