// Menu state

import einstein from '../assets/images/einstein.png';

export default class Menu extends window.Phaser.State {
  preload() {
    this.game.load.image('einstein', einstein);
  }

  create() {
    const imageBtn = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'einstein', this.startGame, this);

    imageBtn.anchor.set(0.5);

    this.game.add.text(250, 16, 'CLICK EINSTEIN TO PLAY', { fill: '#fff' });
  }

  startGame() {
    this.game.state.start('Play');
  }
}
