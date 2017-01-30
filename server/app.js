// require dependencies
const mongoose = require('mongoose');
const db = require('./config/db.js');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const players = require('./Players');
const cookieParser = require('cookie-parser');
const passport = require('passport');

// setup express, http, and socket.io
const express = require('express');
const app = express();
const session = require('express-session');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const playerInstance = new players();
const routes = require('./routes')(playerInstance);

var playerID;

// connect to mongoDB
mongoose.connect(db.url, function(err){
  if(err){
    console.log(err);
  } else {
    console.log('Connected to mongoDB');
  }
});

//Middleware for CORS
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
// the below require statement passes in 'passport' for configuration
require('./config/passportConfig.js')(passport);
app.use(cookieParser());
app.use(session({ secret: 'howlatthemoon' }));
app.use(passport.initialize());
app.use(passport.session());

// set up morgan middleware for logging.
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// set up bodyParser middleware to facilitate interaction with the req.body
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// if the environment is production, then we set the static path to build directory.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '..', 'build')));
}

//for all endpoints, use the routes.js file
app.use('/', routes);

//Below are event listeners for socket.io which enables multi-player gaming

io.on('connection', client => {
  //When a new player connects to the game, we check to see if there are more than two players.
  client.on('new player', function(data) {
    //If there are more two players already, clear playerInstance.players array in Players.js
    //Else, emit a 'new enamy' event and send the existing player back to the client that just connected.
    if (playerInstance.players.length >= 2) {
      playerInstance.clearPlayers();
    } else if (playerInstance.players.length === 1) {
      this.emit('new enemy', playerInstance.players[0]);
    }
    //Create a new Player using the addPlayer method defined in Players.js. Emit this new player back to the client that just connected. Emit 'new enemy' event to the other client.
    let newPlayer = playerInstance.addPlayer(data);
    this.emit('new player added', newPlayer);
    this.broadcast.emit('new enemy', newPlayer);
  });

  //When a client disconnects, use removePlayerById method defined in Players.js to remove from the playerInstance.players array.
  client.on('disconnect', function(data) {
    playerInstance.removePlayerById(this.id);
  });

  // When the werewolf character eats the meat, the score is updated with data from the client.
  client.on('eat', function(data) {
    playerInstance.updatePlayerScore(data);
  });

  // When the human character collects the silver, the score is updated with data from the client.
  client.on('forge', function(data) {
    playerInstance.updatePlayerScore(data);
  });

  // When a character moves, update their player object on the server.
  // Check for collision
  // If there is a collision, determine who won and who lost.
  // Emit winner and loser events to both clients.
  // Clear players from the playerInstance.players array
  client.on('move', function(data) {
    var moves = data;
    var updatedObj = playerInstance.updatePlayers(moves);
    var killed = playerInstance.detectPlayersCollision();
    this.broadcast.emit('move', updatedObj);
    if (killed) {
      var winner = playerInstance.getWinner(playerInstance.players);
      var loser = playerInstance.getLoser(playerInstance.players);
      io.emit('winner', winner);
      io.emit('loser', loser);
      playerInstance.clearPlayers();
      io.emit('player killed');
    }
  });

  // Whenever player collects enough items (meat or silver) switch hunter and prey roles.
  client.on('switch', function() {
    playerInstance.reverseIsHunted();
    this.emit('switch');
    this.broadcast.emit('switch');
  })
});

module.exports = server;
