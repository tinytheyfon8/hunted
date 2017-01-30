// Game over state

import einstein from '../assets/images/einstein.png';

export default class GameOver extends window.Phaser.State {
  preload() {
    this.game.load.image('einstein', einstein);
  }

  create() {
    const imageBtn = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'einstein', this.startGame, this);

    const display = window.app.model.won
      ? `YOU WON!  FINAL SCORE: ${window.app.model.score}`
      : 'YOU SUCK';

    imageBtn.anchor.set(0.5);

    this.game.add.text(
      window.app.model.won ? 340 : 510,
      0,
      display,
      { font: 'bold 36px sans-serif', fill: '#fff' }
    );

    this.game.add.text(300, 575, 'CLICK EINSTEIN TO GO BACK TO MAIN MENU', { fill: '#fff' });
  }

  startGame() {
    // this.game.state.start('Play');
    window.location.reload();
  }
}
