const routes = require('express').Router();
const passport = require('passport');
require('./config/passportConfig.js')(passport);
const bodyParser = require('body-parser');
const User = require('./models/User.js');

routes.get('/users', (req, res) => { //test route to retrieve all user data
  User.find().exec(function(err, users){
    res.send(users);
  });
});

routes.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile']})); //route to obtain google profile data

routes.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
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

module.exports = routes;
