// Local player class with update specific to that player

import Player from './Player';

export default class LocalPlayer extends Player {
  update(direction) {
    if (direction === 'up-right') {
      this.player.x = this.player.x + 11;
      this.player.y = this.player.y - 11;
      this.player.animations.play('right');
    } else if (direction === 'down-right') {
      this.player.x = this.player.x + 11;
      this.player.y = this.player.y + 11;
      this.player.animations.play('right');
    } else if (direction === 'up-left') {
      this.player.x = this.player.x - 11;
      this.player.y = this.player.y - 11;
      this.player.animations.play('left');
    } else if (direction === 'down-left') {
      this.player.x = this.player.x - 11;
      this.player.y = this.player.y + 11;
      this.player.animations.play('left');
    } else if (direction === 'right') {
      this.player.x = this.player.x + 15;
      this.player.animations.play('right');
    } else if (direction === 'left') {
      this.player.x = this.player.x - 15;
      this.player.animations.play('left');
    } else if (direction === 'up') {
      this.player.y = this.player.y - 15;
      this.player.animations.play('up');
    } else if (direction === 'down') {
      this.player.y = this.player.y + 15;
      this.player.animations.play('down');
    }
  }
}
