import io from 'socket.io-client';
import play from './play';


export default class Waiting extends window.Phaser.State {

constructor() {
  super();
  this.me = null;
  this.socket = null;
}


create() {

  //Initiate socket connection
  this.socket = io.connect();
  const text = 'Waiting for Other Player';
  const style = {font: '60px Creepster', fill: '#fff', align: 'center'};
  const startBkg = this.game.add.text(300, 200, text, style);

  this.socket.on('connect', this.playState.bind(this));

}

  playState() {
    console.log('Connected to socket server');
    this.game.state.start('Play');
  //     setTimeout(function() {
  //       this.game.state.start('Play').bind(this)}, 3000);
  // }
}


}