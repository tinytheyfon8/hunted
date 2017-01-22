// Play game state

import land from '../assets/images/earth.png';

export default class Play extends window.Phaser.State {
  constructor() {
    super();

    this.land = null;
  }

  preload() {
    this.game.load.image('land', land);
  }

  create() {
    this.game.world.setBounds(-1000, -1000, 2000, 2000);

    this.land = this.game.add.tileSprite(0, 0, 800, 600, 'land');
    land.fixedToCamera = true;
  }

  update() {

  }
}
