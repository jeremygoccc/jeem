import React from 'react';
import {
  HashRouter as Router, Route, Switch, Redirect,
} from 'jeem/router';

import LoginLayout from './layouts/LoginLayout'
import BasicLayout from './layouts/BasicLayout'

export default function () {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/Login" />
        <Route path="/Login" component={LoginLayout} />
        <Route path="/Admin" component={BasicLayout} />
      </Switch>
    </Router>
  );
}
