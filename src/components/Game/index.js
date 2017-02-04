import React, { Component } from 'react';

// Pull in Phaser states
import * as states from '../../phaser/states';

// Game component is where game is rendered.
class Game extends Component {

  // Create game that renders at #phaserContainer.
  // Add each state to game. Start the MainMenu state.
  componentDidMount() {
    const game = new window.Phaser.Game(1200, 600, window.Phaser.AUTO, 'phaserContainer'); // window.Phaser.AUTO is a rendering method. AUTO defers making the decision over what renering method to use - Canvas or WebGL. Usually, Phaser opts to use WebGL
    Object.keys(states).forEach(state => game.state.add(state, states[state]));
    game.state.start('MainMenu');
  }

  render() {
    return (
      <div id="phaserContainer"></div>
    );
  }
}

export default Game;
