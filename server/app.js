// require dependencies
const mongoose = require('mongoose');
const db = require('./config/db.js');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const players = require('./Players')
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const passport = require('passport');

// setup express, http, and socket.io
const express = require('express');
const app = express();
const session = require('express-session');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const playerInstance = new players();

// connect to mongoDB
mongoose.connect(db.url, function(err){
  if(err){
    console.log(err);
  } else {
    console.log('Connected to mongoDB');
  }
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    next();
  }
});

// set up express app to use passport
require('./config/passportConfig.js')(passport); //does this need to be above the mongodb connection?
// the above require statement passes in 'passport' for configuration
app.use(cookieParser());
app.use(session({ secret: 'howlatthemoon' }));
app.use(passport.initialize());
app.use(passport.session());

// set up middleware
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '..', 'build')));
}

app.get('/api/players/:isNewPlayer', (req, res) => {
  if (req.params.isNewPlayer === 'true' && playerInstance.players.length >= 2) {
    playerInstance.clearPlayers();
  }
  res.json(playerInstance.players);
});

app.use('/', routes);

// Catch everything that isn't in routes and send
// to client so react-router can handle it
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
  });
}

io.on('connection', client => {
  client.on('new player', function(data) {
    if (playerInstance.players.length >= 2) {
      playerInstance.clearPlayers();
    } else if (playerInstance.players.length === 1) {
      this.emit('new enemy', playerInstance.players[0]);
    }
    let newPlayer = playerInstance.addPlayer(data);
    this.emit('new player added', newPlayer);
    this.broadcast.emit('new enemy', newPlayer);
  });

  client.on('disconnect', function(data) {
    playerInstance.removePlayerById(this.id);
    console.log('disconnected');
  });

  client.on('eat', function(data) {
    console.log("somthing was eaten", data);
    this.broadcast.emit('eat', data);
  });

  client.on('forge', function(data) {
    console.log("somthing was forged", data);
    this.broadcast.emit('forge', data);
  });

  client.on('move', function(data) {
    var moves = data;
    var updatedObj = playerInstance.updatePlayers(moves);
    var killed = playerInstance.detectPlayersCollision();
    this.broadcast.emit('move', updatedObj);
    if (killed) {
      playerInstance.clearPlayers();
      io.emit('player killed');
    }
  });
  client.on('switch', function(){
    playerInstance.reverseIsHunted();
    console.log('player array after switch.....', playerInstance.players);
    this.emit('switch');
    this.broadcast.emit('switch');
  })
});

module.exports = server;
