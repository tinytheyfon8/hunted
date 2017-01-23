const routes = require('express').Router();
// const UserArticleController = require('./user-articles/articleController');
//
// routes.get('/api/user-articles', UserArticleController.findUserArticles);
//
// routes.post('/api/user-articles', UserArticleController.addArticle);
routes.get('/api/doit', (req, res) => {
  res.json({ test: 'This is a message' });
});

module.exports = routes;
