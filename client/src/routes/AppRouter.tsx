import React, { Fragment } from 'react';
import { IRootReducer } from '../reducers/rootReducer';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../components/utils/ProtectedRoute';
import Auth from '../pages/Auth';
import AuthCallback from '../pages/AuthCallback';
import Boards from '../pages/Boards';
import Board from '../pages/Board';
import Navbar from '../components/Navbar';
import Landing from '../pages/Landing';
import CookiesModal from '../components/CookiesModal';

interface IAppRouter {
  cookiesModalVisible: boolean;
};

const AppRouter = ({
  cookiesModalVisible,
}: IAppRouter): JSX.Element => (
  <Fragment>
    <BrowserRouter>
      {cookiesModalVisible && <CookiesModal />}
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
  </Fragment>
);

const mapStateToProps = (state: IRootReducer) => ({
  cookiesModalVisible: state.session.cookiesModalVisible,
});

export default connect(mapStateToProps)(AppRouter);
