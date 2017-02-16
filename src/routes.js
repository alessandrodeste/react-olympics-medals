import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import App from './components/App';
import MedalTable from './components/MedalTable';

export default (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={MedalTable} />
    </Route>
  </Router>
);
