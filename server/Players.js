var Player = require('./Player.js');

class Players {
  constructor() {
    this.players = [];
  }

  detectPlayersCollision() {
    var player1 = this.players[0];
    var player2 = this.players[1];
    if (
      player1.x >= player2.x - 25 &&
      player1.x <= player2.x + 25 &&
      player1.y >= player2.y - 25 &&
      player1.y <= player2.y + 25
    ) {
      return true;
    } else {
      return false;
    }
  }

  updatePlayers(updatedPlayer) {
    for(var i = 0; i < this.players.length; i++){
      if(this.players[i].id === updatedPlayer.id){
        this.players[i].x = updatedPlayer.x;
        this.players[i].y = updatedPlayer.y;
        this.players[i].direction = updatedPlayer.direction;
        return this.players[i];
      }
    }
  }


  addPlayerAndAssignRole(id) {
    var player;
    if(this.players.length && this.players.length % 2 === 0) {
      player = new Player(500, 500, 'left', 'human', true, id)
      this.players.push(player);
      return player;
    } else {
      player = new Player(100, 100, 'right', 'werewolf', false, id)
      this.players.push(player);
      return player;
    }
  }

  reverseIsHunted() {
    this.players.forEach(player => player.isHunted = !player.isHunted)
  }

  clearPlayers() {
    this.players = [];
  }
}

module.exports = Players;



// * PLayer methods
//   - detect player collision
//   - get player by id
//   - change isHunted boolean
//   -
