import React, { Component, Fragment, Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../components/utils/ProtectedRoute';
import Home from '../pages/Home';
import Boards from '../pages/Boards';

class AppRouter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <ProtectedRoute path="/boards" component={Boards} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default AppRouter;
