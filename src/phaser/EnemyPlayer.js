// Enemy player class with update specific to remote player

import Player from './Player';

export default class EnemyPlayer extends Player {
  constructor(game, x, y, direction, type, isHunted, name, id) {
    super(game, x, y, direction, type, isHunted, name, id);

    this.previousPosition = { x, y, direction };
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
      this.showStopAnimations(this.previousPosition.direction);
    }
  }
}
