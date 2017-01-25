

export default class EnemyPlayer {
  constructor(game, x, y, direction, type, isHunted, name) {
    this.game = game;
    this.direction = direction;
    this.type = type;
    this.isHunted = isHunted;
    this.name = name;
    this.alive = true;

    this.previousPosition = { x, y, direction };

    this.player = this.game.add.sprite(x, y, this.type);
    this.player.animations.add('left', [0, 9, 18, 27], 10, true);
    this.player.animations.add('down', [1, 10, 19, 28], 10, true);
    this.player.animations.add('right', [2, 11, 20, 29], 10, true);
    this.player.animations.add('up', [3, 12, 21, 30], 10, true);
    this.player.animations.add('stop-left', [0], 10, true);
    this.player.animations.add('stop-down', [1], 10, true);
    this.player.animations.add('stop-right', [2], 10, true);
    this.player.animations.add('stop-up', [3], 10, true);
  }

  update(x, y, direction) {
    if (x !== this.previousPosition.x || y !== this.previousPosition.y || direction !== this.previousPosition.direction) {
      this.player.x = x;
      this.player.y = y;
      this.player.direction = direction;
      this.player.animations.play(direction);

      this.previousPosition.x = x;
      this.previousPosition.y = y;
      this.previousPosition.direction = direction;
    } else {
      if (
        this.previousPosition.direction === 'right' ||
        this.previousPosition.direction === 'up-right' ||
        this.previousPosition.direction === 'down-right'
      ) {
        this.player.animations.play('stop-right');
      } else if (
        this.previousPosition.direction === 'left' ||
        this.previousPosition.direction === 'up-left' ||
        this.previousPosition.direction === 'down-left'
      ) {
        this.player.animations.play('stop-left');
      } else if (this.previousPosition.direction === 'up') {
        this.player.animations.play('stop-up');
      } else if (this.previousPosition.direction === 'down') {
        this.player.animations.play('stop-down');
      }
    }
  }
}
