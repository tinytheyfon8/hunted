import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';

import './index.css';
import Routes from './routes';

// Set global app object to share data between react and phaser
import model from './model';

let app = {};
app.model = model;
window.app = app;

ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root')
);
