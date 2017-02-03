import io from 'socket.io-client';
import play from './play';


export default class Waiting extends window.Phaser.State {

constructor() {
  super();
  this.me = null;
  this.socket = null;
}

preload() {
}

create() {
  var firstPlayer = false, secondPlayer = false;

  //Initiate socket connection
  this.socket = io.connect();
  const text = 'Waiting for Other Player';
  const style = {font: '60px Creepster', fill: '#fff', align: 'center'};
  const startBkg = this.game.add.text(300, 200, text, style);

  this.socket.on('new player added', function() {firstPlayer = true; console.log('1st player');});
  this.socket.on('new enemy', function() {console.log('Two players if new enemy is trigger');});
  this.socket.on('connect', this.switchStates.bind(this));

}

update() {
  // if (this.me) {
  //   console.log('This.me is here', this.me);
  //   console.log('This.enemy is here', this.enemy);
  // } else
  //   console.log('This.me is not here');

}

  switchStates() {
    console.log('Connected to socket server');
    this.game.state.start('Play');
  //     setTimeout(function() {
  //       this.game.state.start('Play').bind(this)}, 3000);
  // }
}


}