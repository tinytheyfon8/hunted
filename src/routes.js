import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { isAuth } from './helpers';

import App from './components/App';
import Login from './components/Login';
import Game from './components/Game';
import Scores from './components/Scores';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App}>
      <IndexRoute component={isAuth() ? Game : Login} />
      <Route path="scores" component={isAuth() ? Scores : Login} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default Routes;
