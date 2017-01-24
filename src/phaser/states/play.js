// Play game state

import io from 'socket.io-client';

import land from '../assets/images/earth.png';
import meat from '../assets/images/food.png';
import silver from '../assets/images/silver.png';
import player from '../assets/images/werewolf.png';

export default class Play extends window.Phaser.State {
  constructor() {
    super();

    this.player = null;
    this.remotePlayer = null;
    this.land = null;
    this.meatObj = {};
    this.silverObj = {};
    this.squareSize = 46;
    this.score = 0;
    this.speed = 0;
    this.updateDelay = 0;
    this.direction = 'right';
    this.newDirection = null;
    this.cursors = null;
    this.scoreTextValue = null;
    this.textStyleKey = {};
    this.textStyleValue = {};
    this.socket = null;
  }

  preload() {
    this.game.load.image('land', land);
    this.game.load.spritesheet('player', player, 46, 46); //46 by 46 is the perfect size
    this.game.load.spritesheet('meat', meat, 16, 17); //load meat sprite
    this.game.load.spritesheet('silver', silver, 37, 35); //load silver sprite
  }

  create() {
    this.socket = io.connect();

    this.game.world.setBounds(0, 0, 720, 600);

    this.land = this.game.add.tileSprite(0, 0, 720, 600, 'land');
    // land.fixedToCamera = true;

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.player = this.game.add.sprite(150, 150, 'player');
    this.player.animations.add('left', [0], 10, true);
    this.player.animations.add('right', [2], 10, true);
    this.player.animations.add('down', [1], 10, true);
    this.player.animations.add('up', [3], 10, true);

    this.game.physics.enable(this.player, window.Phaser.Physics.ARCADE);
    this.player.body.collideWorldBounds = true;
    this.player.checkWorldBounds = true;
    this.player.events.onOutOfBounds.add(function(){
      console.log('out of bounds');
    });

    for (let i = 0; i < 10; i++) {
      this.generateSilver(i);
    }

    for (let i = 0; i < 10; i++) {
      this.generateMeat(i);
    }

    this.textStyleKey = { font: 'bold 14px sans-serif', fill: '#46c0f9', align: 'center' };
    this.textStyleValue = { font: 'bold 18px sans-serif', fill: '#fff', align: 'center' };

    // Score.
    this.game.add.text(30, 20, 'SCORE', this.textStyleKey);
    this.scoreTextValue = this.game.add.text(90, 18, this.score.toString(), this.textStyleValue);

    this.setEventHandlers();
  }

  update() {
    if (
      this.cursors.right.isDown || this.cursors.left.isDown ||
      this.cursors.up.isDown || this.cursors.down.isDown
    ) {
      this.speed = 2;
    } else {
      this.speed = 0;
    }

    if (this.cursors.right.isDown) {
      this.newDirection = 'right';
    } else if (this.cursors.left.isDown) {
      this.newDirection = 'left';
    } else if (this.cursors.up.isDown) {
      this.newDirection = 'up';
    } else if (this.cursors.down.isDown) {
      this.newDirection = 'down';
    }

    this.updateDelay++;

    if (this.speed > 0 && this.updateDelay % (8 - this.speed) === 0) {
      if (this.newDirection) {
        this.direction = this.newDirection;
        this.newDirection = null;
      }

      if (this.direction === 'right') {
        this.player.x = this.player.x + 15;
        this.player.y = this.player.y;
        this.player.animations.play('right');
      } else if (this.direction === 'left') {
        this.player.x = this.player.x - 15;
        this.player.y = this.player.y;
        this.player.animations.play('left');
      } else if (this.direction === 'up') {
        this.player.x = this.player.x;
        this.player.y = this.player.y - 15;
        this.player.animations.play('up');
      } else if (this.direction === 'down') {
        this.player.x = this.player.x;
        this.player.y = this.player.y + 15;
        this.player.animations.play('down');
      }

      this.socket.emit('move', { x: this.player.x, y: this.player.y, direction: this.direction } );


      // for each meatPiece, check to see if the player's
      // location is the same as the meatPiece
      // had to change to object since destroy will not
      // remove from array
      Object.keys(this.meatObj).forEach(i => {
        this.meatCollision(this.meatObj[i], i);
      });

      // this.meatArr.forEach(meatPiece => {
      //   this.meatCollision(meatPiece);
      // });
    }
  }

  generateSilver(i) {
    const randomX = Math.floor(Math.random() * 14) * this.squareSize,
          randomY = Math.floor(Math.random() * 12) * this.squareSize;

    const silver = this.game.add.sprite(randomX, randomY, 'silver');
    silver.frame = 7;

    this.meatObj[i] = silver;
  }

  generateMeat(i) {
    const randomX = Math.floor(Math.random() * 14) * this.squareSize,
          randomY = Math.floor(Math.random() * 12) * this.squareSize;

    const meat = this.game.add.sprite(randomX, randomY, 'meat');
    meat.frame = 140;

    this.meatObj[i] = meat;
  }

  meatCollision(food, i) {
    if (
      this.player.x >= food.x - 25 &&
      this.player.x <= food.x + 25 &&
      this.player.y >= food.y - 25 &&
      this.player.y <= food.y + 25
    ) {
      // because the x, y coordinates of the meat and
      // player never line up perfectly, give a range
      // of overlapping variables
      delete this.meatObj[i];
      food.destroy();
      this.score++;
      this.scoreTextValue.text = this.score.toString();
      this.socket.emit('eat', { score: this.score });
    }
  }

  setEventHandlers() {
    this.socket.on('connect', this.onSocketConnected.bind(this));
    this.socket.on('eat', this.onMeatEat.bind(this));
    this.socket.on('move', this.onPlayerMovement.bind(this));
  }



  onSocketConnected() {
    console.log('Connected to socket server');

    this.socket.emit('event', { connected: true });
  }

  onMeatEat(data){
    console.log('other player ate meat', data);
  }

  onPlayerMovement(data){
    console.log('other player moved:', data);

    this.player.x = data.x;
    this.player.y = data.y;
    this.player.direction = data.direction;
    this.player.animations.play(this.player.direction);
  }
}
