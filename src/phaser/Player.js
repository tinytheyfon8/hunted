// General player class

export default class Player {
  constructor(game, x, y, direction, type, isHunted, name, id) {
    this.game = game;
    this.direction = direction;
    this.type = type;
    this.isHunted = isHunted;
    this.name = name;
    this.id = id;
    this.alive = true;

    this.previousPosition = { x, y, direction };

    this.player = this.game.add.sprite(x, y, this.type);

    if(this.type === 'human'){
      this.player.scale.setTo(2,2);
    }

    if(this.type === "werewolf"){
      this.player.animations.add('left', [0, 9, 18, 27], 10, true);
      this.player.animations.add('down', [1, 10, 19, 28], 10, true);
      this.player.animations.add('right', [2, 11, 20, 29], 10, true);
      this.player.animations.add('up', [3, 12, 21, 30], 10, true);
      this.player.animations.add('stop-left', [0], 10, true);
      this.player.animations.add('stop-down', [1], 10, true);
      this.player.animations.add('stop-right', [2], 10, true);
      this.player.animations.add('stop-up', [3], 10, true);
    } else if(this.type === "human" && this.isHunted === true){
      this.player.animations.add('left', [2], 10, true);
      this.player.animations.add('down', [1, 15], 10, true);
      this.player.animations.add('right', [4], 10, true);
      this.player.animations.add('up', [3, 17], 10, true);
      this.player.animations.add('stop-left', [2], 10, true);
      this.player.animations.add('stop-down', [1], 10, true);
      this.player.animations.add('stop-right', [4], 10, true);
      this.player.animations.add('stop-up', [3], 10, true);
    } else if (this.type === "human" && this.isHunted === false) {

    }

    this.game.physics.enable(this.player, window.Phaser.Physics.ARCADE);
    this.player.body.collideWorldBounds = true;
    this.player.checkWorldBounds = true;
    this.player.events.onOutOfBounds.add(function() {
      console.log('out of bounds');
    });
  }

  showStopAnimations(direction) {
    if (direction === 'right' || direction === 'up-right' || direction === 'down-right') {
      this.player.animations.play('stop-right');
    } else if (direction === 'left' || direction === 'up-left' || direction === 'down-left') {
      this.player.animations.play('stop-left');
    } else if (direction === 'up') {
      this.player.animations.play('stop-up');
    } else if (direction === 'down') {
      this.player.animations.play('stop-down');
    }
  }

  changeHuntedStatus() {
    this.isHunted = !this.isHunted;
  }
}
