const articleRouter = require('express').Router();

const { getArticles, saveArticle, deleteArticle } = require('../controllers/article');

articleRouter.get('/articles', getArticles);
articleRouter.post('/articles', saveArticle);
//keyword, title, text, date, source, link, image (?joi)
articleRouter.delete('/articles/articleId ', deleteArticle);

module.exports = articleRouter;
