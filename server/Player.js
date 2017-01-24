
module.exports = class Player {
  constructor(x, y, dir, type, isHunted, id) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.type = type;
    this.isHunted = isHunted;
    this.id = id;
  }
}