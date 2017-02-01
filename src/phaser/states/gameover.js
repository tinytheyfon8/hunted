// Game over state

import einstein from '../assets/images/einstein.png';
// import gameovermusic from '../assets/audio/FILLMEIN.mp3';

export default class GameOver extends window.Phaser.State {

  // Before the GameOver state displays, the einstein image is loaded.
  preload() {
    this.game.load.image('einstein', einstein);

    // this.load.audio('gameovermusic', gameovermusic)
  }

  // By setting up global variables in the create method, we initialize them when the GameOver state starts
  create() {
    const imageBtn = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'einstein', this.startGame, this);
    // const music = this.game.add.audio('gameovermusic')
    // Using the won property of the window object, we display a win message or a lose message.
    const display = window.app.model.won
      ? `YOU WON!  FINAL SCORE: ${window.app.model.score}`
      : 'YOU SUCK';

    // music.play();  

    imageBtn.anchor.set(0.5);

    // And then we render that text from above (depebding on whether player won or lost) using the add method.
    // The 340 and 510 are x coordinates (depending on whether player won or lost).
    // The 0 is the y coordinate.
    this.game.add.text(
      window.app.model.won ? 340 : 510,
      0,
      display,
      { font: 'bold 36px sans-serif', fill: '#fff' }
    );

    // This text is added at the buttom regardless if player won or lost.
    this.game.add.text(300, 575, 'CLICK EINSTEIN TO GO BACK TO MAIN MENU', { fill: '#fff' });
  }

  startGame() {
    //This causes page to reload to clear any data on the client side and prevents subsequent game sessions from having erratic behavior.
    window.location.reload();
  }
}
