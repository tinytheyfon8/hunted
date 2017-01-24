
module.exports = class Players {
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

  addPlayerAndAssignRole() {
    var randomNumber = Math.floor(Math.random() * 1000); //replace with id provided by sockets
    var player;
    if(this.players.length === 0) {
      player = new Player(100, 100, 'right', 'Werewolf', false, randomNumber)
      this.players.push(player);
      return player;
    } else if (this.player.length === 1) {
      player = new Player(500, 500, 'left', 'Human', true, randomNumber)
      this.players.push(player);
      return player;
    }
  }

  reverseIsHunted() {
    this.players.forEach(player => player.isHunted = !player.isHunted)
  }



}





// * PLayer methods
//   - detect player collision
//   - get player by id
//   - change isHunted boolean
//   -