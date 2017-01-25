var Player = require('./Player.js');

class Players {
  constructor() {
    this.players = [];
  }

  detectPlayersCollision(player1, player2) {
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
