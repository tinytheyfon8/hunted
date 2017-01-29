import React, { Component } from 'react';

import * as states from '../../phaser/states';

class Game extends Component {
  componentDidMount() {
    const game = new window.Phaser.Game(1200, 600, window.Phaser.AUTO, 'phaserContainer');
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
