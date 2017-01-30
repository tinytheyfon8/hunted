const routes = require('express').Router();
const passport = require('passport');
require('./config/passportConfig.js')(passport);
const bodyParser = require('body-parser');
const User = require('./models/User.js');
const Game = require('./models/Game.js');

routes.get('/users', (req, res) => { //test route to retrieve all user data
  User.find().exec(function(err, users){
    res.send(users);
  });
});

routes.get('/games', (req, res) => { //test route to retrieve all game data
  Game.find().exec((err, games) => {
    res.send(games);
  });
});

routes.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email']})); //route to obtain google profile data

routes.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('req session passport user ------------', req.session.passport.user);
    req.session.user = req.session.passport.user;
    res.cookie('loggedIn', true);
    res.redirect('/');
  });

routes.get('/logout', function(req, res) {
  console.log('req session before destroy', req.session);
  req.session.destroy(function(e){
    req.logout();
    console.log('wrequed session..... ', req.session);
    res.clearCookie('loggedIn');
    res.redirect('/');
  });
});

routes.post('/gameover', (req, res) => {
  var date = new Date();
  var playerObj = req.body;
  var playerID;
  if(req.user && req.user._id) {
    playerID = req.user._id;
  }
  var newGame = new Game({
    player_id: playerID,
    player_type: playerObj.type,
    player_score: playerObj.score,
    player_won: playerObj.won,
    date: date
  }).save((err, game) => {
    if(err) {
      console.log(err);
    }
    if(game) {
      console.log('----- game saved! ---- ', game);
      return game;
    }
  });
});

module.exports = routes;
