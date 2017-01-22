import React, { Component } from 'react';
import './App.css';

import * as states from '../../phaser/states';

class App extends Component {
  componentDidMount() {
    const game = new window.Phaser.Game(800, 600, window.Phaser.AUTO, 'phaserContainer');
    Object.keys(states).forEach(state => game.state.add(state, states[state]));
    game.state.start('Menu');
  }

  render() {
    return (
      <div className="App">
        <div id="phaserContainer"></div>
      </div>
    );
  }
}

export default App;
