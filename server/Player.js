class Player {
  constructor(x, y, dir, type, isHunted, id, score, won) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.type = type;
    this.isHunted = isHunted;
    this.id = id;
    this.score = score;
    this.won = won;
  }
}

module.exports = Player;