import React, { Component } from 'react';
import werewolf from './werewolf.png';
import google from './google_signin.png';
import './Login.css';

// Login component allows user to login with google account by
// directing to /auth/google on server.
class Login extends Component {
  render() {
    return (
      <div className="well">
        <img className="werewolf" src={werewolf}/>
        <h1 className="mainWelcome">
          Prepare to be <span className="title-big">HUNTED</span>!
        </h1>
        <p className="description">
          In this 2D multiplayer game, one player (the werewolf) pursues the
          other player (the human) and attempts to win the game by catching them.
          However, the tables can quickly turn on the werewolf. The human simply
          has to survive long enough to acquire 10 pieces of silver in order to
          build a weapon. Once they have a weapon, the hunter has now become the
          hunted. The werewolf must eat enough pieces of meat to be able to overpower
          the human, thus reversing their roles again. This continues until one
          player is eliminated.
        </p>
        <h4 className="prompt">
          Sign in with your Google+ account in order to save your scores.
        </h4>
        <a href="/auth/google" className="login">
          <img alt="" src={google} />
        </a>
      </div>
    );
  }
}

export default Login;
