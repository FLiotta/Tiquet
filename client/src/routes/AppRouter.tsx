import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../components/utils/ProtectedRoute';
import Auth from '../pages/Auth';
import AuthCallback from '../pages/AuthCallback';
import Boards from '../pages/Boards';
import Board from '../pages/Board';
import Navbar from '../components/Navbar';
import Landing from '../pages/Landing';

const AppRouter = (props: any): JSX.Element => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={Landing} exact />
      <Route path="/home" component={Landing} />
      <Route path="/auth/callback" component={AuthCallback} />
      <Route path="/auth" component={Auth} />
      <Fragment>
        <Navbar />
        <ProtectedRoute path="/b/:id" component={Board} />
        <ProtectedRoute path="/boards" component={Boards} />
      </Fragment>
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
