const mongoose = require('mongoose');
const Game = require('./models/Game.js');

module.exports = function(playerArr){
  var date = new Date();
  var player1 = playerArr[0];
  var player2 = playerArr[1];
  var newGame = new Game({
    player1_id: player1.id,
    player1_score: player1.score,
    player2_id: player2.id,
    player2_score: player2.score,
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
}
