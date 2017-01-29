import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  render() {
    return (
      <div className="well">
        <a href="/auth/google" className="login">
            <img alt="" src={require("./google_signin.png")} />
        </a>
      </div>
    );
  }
}

export default Login;
