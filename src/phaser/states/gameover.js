// Game over state

import einstein from '../assets/images/einstein.png';

export default class GameOver extends window.Phaser.State {
  preload() {
    this.game.load.image('einstein', einstein);
  }

  create() {
    const imageBtn = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'einstein', this.startGame, this);

    imageBtn.anchor.set(0.5);

    this.game.add.text(140, 16, 'GAME OVER   CLICK TO PLAY AGAIN', { fill: '#fff' });
  }

  startGame() {
    // this.game.state.start('Play');
    window.location.reload();
  }
}
