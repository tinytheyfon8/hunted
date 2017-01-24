

export default class EnemyPlayer {
  constructor(game, x, y, direction, role, name) {
    this.game = game;
    this.direction = direction;
    this.role = role;
    this.name = name;
    this.alive = true;

    this.previousPosition = { x, y, direction };

    this.player = this.game.add.sprite(x, y, this.role);
    this.player.animations.add('left', [0, 9, 18, 27], 10, true);
    this.player.animations.add('down', [1, 10, 19, 28], 10, true);
    this.player.animations.add('right', [2, 11, 20, 29], 10, true);
    this.player.animations.add('up', [3, 12, 21, 30], 10, true);
  }

  update(x, y, direction) {
    if (x !== this.previousPosition.x || y !== this.previousPosition.y || direction !== this.previousPosition.direction) {
      this.player.x = x;
      this.player.y = y;
      this.player.direction = direction;
      this.player.animations.play(direction);
    }
  }
}
