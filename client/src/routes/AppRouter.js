import React, { Component, Fragment, Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../components/utils/ProtectedRoute';
import Home from '../pages/Home';
import Boards from '../pages/Boards';
import Board from '../pages/Board';
import Profile from '../pages/Profile';
import Navbar from '../components/Navbar';
import Error404 from '../pages/Error404';

class AppRouter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} exact />
          <Fragment>
            <Navbar />
            <ProtectedRoute path="/b/:id" component={Board} />
            <ProtectedRoute path="/boards" component={Boards} />
            <ProtectedRoute path="/profile" component={Profile} />
            <Route path="/*" component={Error404} />
          </Fragment>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default AppRouter;
