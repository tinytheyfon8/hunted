const routes = require('express').Router();
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');
const User = require('./models/User.js');
const Game = require('./models/Game.js');

//Authentication middleware
const isLoggedIn = require('./helpers/isLoggedIn');

require('./config/passportConfig.js')(passport);

module.exports = (playerInstance) => {

  routes.get('/api/players/:isNewPlayer', isLoggedIn, (req, res) => {
    if (req.params.isNewPlayer === 'true' && playerInstance.players.length >= 2) {
      playerInstance.clearPlayers();
    }
    res.json(playerInstance.players);
  });

  //this is a test route to retrieve all user data
  routes.get('/api/users', isLoggedIn, (req, res) => {
    User.find().exec(function(err, users){
      res.send(users);
    });
  });

  //this is a test route to retrieve all game data
  routes.get('/api/games', isLoggedIn, (req, res) => {
    Game.find().exec((err, games) => {
      res.send(games);
    });
  });

  //this is a route to display all scores sorted in descending order
  routes.get('/api/scores', isLoggedIn, (req, res) => {
    console.log(req.session.passport.user);
    User.find({ '_id': req.session.passport.user }).exec((err, user) => {
      const { name, email } = user[0];
      Game
        .find({ 'player_id': req.session.passport.user })
        .sort({ 'player_score': -1 })
        .exec((err, games) => {
          const gamesWithName = games.map(game => {
            const { player_type, player_score, player_won } = game;
            return { name, email, player_type, player_score, player_won };
          });
          res.json(gamesWithName);
        });
    });
  });

  //this is a route to obtain google profile data
  routes.get('/auth/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email']}));

  //After successfully obtaining profile data from Google, create a new session and a cookie which enables user to accesss protected routes
  routes.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
      req.session.user = req.session.passport.user;
      res.cookie('loggedIn', true);
      res.redirect('/');
    });

  //When user tries to logout, use req.session.destroy method to end session and return to the login screen.
  routes.get('/logout', function(req, res) {
    req.session.destroy(function(e){
      req.logout();
      res.clearCookie('loggedIn');
      res.redirect('/');
    });
  });

  // After collision has been detected on server, an event is emitted to the clients.
  // The clients then send a post request with their game data.
  // When the server recieves post request, it creates a new game instance and saves it to the database.
  routes.post('/api/gameover', isLoggedIn, (req, res) => {
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
        return game;
      }
    });
  });

  // If we are on the production server, route all the routes (besides API) to the client.
  if (process.env.NODE_ENV === 'production') {
    routes.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
    });
  }

  return routes;

};