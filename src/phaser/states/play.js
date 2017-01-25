// Play game state

import io from 'socket.io-client';

import EnemyPlayer from '../EnemyPlayer';
import LocalPlayer from '../LocalPlayer';

import land from '../assets/images/earth.png';
import meat from '../assets/images/food.png';
import silver from '../assets/images/silver.png';
import werewolf from '../assets/images/werewolf.png';

export default class Play extends window.Phaser.State {
  constructor() {
    super();

    this.me = null;
    this.enemy = null;
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
    this.game.load.spritesheet('werewolf', werewolf, 46, 46); //46 by 46 is the perfect size
    this.game.load.spritesheet('meat', meat, 16, 17); //load meat sprite
    this.game.load.spritesheet('silver', silver, 37, 35); //load silver sprite
  }

  create() {
    this.game.world.setBounds(0, 0, 720, 600);

    this.land = this.game.add.tileSprite(0, 0, 720, 600, 'land');

    this.cursors = this.game.input.keyboard.createCursorKeys();

    this.socket = io.connect();

    this.setEventHandlers();

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
  }

  update() {
    if (this.me) {
      if (
        this.cursors.right.isDown || this.cursors.left.isDown ||
        this.cursors.up.isDown || this.cursors.down.isDown
      ) {
        this.speed = 2;
      } else {
        this.speed = 0;
      }

      if (this.cursors.right.isDown && this.cursors.up.isDown) {
        this.newDirection = 'up-right';
      } else if (this.cursors.right.isDown && this.cursors.down.isDown) {
        this.newDirection = 'down-right';
      } else if (this.cursors.left.isDown && this.cursors.up.isDown) {
        this.newDirection = 'up-left';
      } else if (this.cursors.left.isDown && this.cursors.down.isDown) {
        this.newDirection = 'down-left';
      } else if (this.cursors.right.isDown) {
        this.newDirection = 'right';
      } else if (this.cursors.left.isDown) {
        this.newDirection = 'left';
      } else if (this.cursors.up.isDown) {
        this.newDirection = 'up';
      } else if (this.cursors.down.isDown) {
        this.newDirection = 'down';
      }

      this.updateDelay++;

      if (this.updateDelay % (8 - this.speed) === 0) {
        if (this.speed > 0) {
          if (this.newDirection) {
            this.direction = this.newDirection;
            this.me.direction = this.direction;
            this.newDirection = null;
          }

          this.me.update(this.direction);

          // for each meatPiece, check to see if the player's
          // location is the same as the meatPiece
          // had to change to object since destroy will not
          // remove from array
          Object.keys(this.meatObj).forEach(i => {
            this.meatCollision(this.meatObj[i], i);
          });
        } else {
          this.me.showStopAnimations(this.direction);
        }

        this.socket.emit('move', { x: this.me.player.x, y: this.me.player.y, direction: this.me.direction, id: this.me.id } );
      }
    }
  }

  generateSilver(i) {
    const randomX = Math.floor(Math.random() * 14) * this.squareSize;
    const randomY = Math.floor(Math.random() * 12) * this.squareSize;

    const silver = this.game.add.sprite(randomX, randomY, 'silver');
    silver.frame = 7;

    this.meatObj[i] = silver;
  }

  generateMeat(i) {
    const randomX = Math.floor(Math.random() * 14) * this.squareSize;
    const randomY = Math.floor(Math.random() * 12) * this.squareSize;

    const meat = this.game.add.sprite(randomX, randomY, 'meat');
    meat.frame = 140;

    this.meatObj[i] = meat;
  }

  meatCollision(food, i) {
    if (
      this.me.player.x >= food.x - 25 &&
      this.me.player.x <= food.x + 25 &&
      this.me.player.y >= food.y - 25 &&
      this.me.player.y <= food.y + 25
    ) {
      // because the x, y coordinates of the meat and
      // player never line up perfectly, give a range
      // of overlapping variables
      delete this.meatObj[i];
      food.destroy();
      this.score++;
      this.scoreTextValue.text = this.score.toString();
      if(this.score === 9){
        this.switchRoles();
      }
      this.socket.emit('eat', { score: this.score });
    }
  }

  switchRoles(){
    console.log('switching started');
    this.socket.emit('switch');
  }

  setEventHandlers() {
    this.socket.on('connect', this.onSocketConnected.bind(this));
    this.socket.on('new player added', this.onNewPlayerAdded.bind(this));
    this.socket.on('new enemy', this.onNewEnemyPlayer.bind(this));
    this.socket.on('eat', this.onMeatEat.bind(this));
    this.socket.on('move', this.onPlayerMovement.bind(this));
  }

  onSocketConnected() {
    console.log('Connected to socket server');

    this.socket.emit('new player');
  }

  onNewPlayerAdded(data) {

    // HARD CODE TO WEREWOLF UNTIL HUMAN SPRITE IS ADDED
    data.type = 'werewolf';

    this.me = new LocalPlayer(
      this.game, data.x, data.y, data.dir,
      data.type, data.isHunted, 'me', data.id
    );
  }

  onNewEnemyPlayer(data) {
    console.log(data);

    // HARD CODE TO WEREWOLF UNTIL HUMAN SPRITE IS ADDED
    data.type = 'werewolf';

    this.enemy = new EnemyPlayer(
      this.game, data.x, data.y, data.dir,
      data.type, data.isHunted, 'enemy', data.id
    );
    console.log('enemy added', this.enemy);
  }

  onMeatEat(data) {
    console.log('other player ate meat', data);
  }

  onPlayerMovement(data) {
    console.log('this enemy', this.enemy);
    this.enemy.update(data.x, data.y, data.direction);
  }

  onRoleSwitch() {
    alert('The hunter has become the hunted!');
  }
}
