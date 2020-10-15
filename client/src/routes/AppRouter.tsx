import React, { Fragment, Suspense, lazy } from 'react';
import { IRootReducer } from '../reducers/rootReducer';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProtectedRoute from '../components/utils/ProtectedRoute';
import Landing from '../pages/Landing';
import CookiesModal from '../components/CookiesModal';
import Loading from '../components/Loading';
import Auth from '../pages/Auth';
const AuthCallback = lazy(() => import('../pages/AuthCallback'));
const Boards = lazy(() => import('../pages/Boards'));
const Board = lazy(() => import('../pages/Board'));
const Navbar = lazy(() => import('../components/Navbar'));


interface IAppRouter {
  cookiesModalVisible: boolean;
};

const AppRouter = ({
  cookiesModalVisible,
}: IAppRouter): JSX.Element => (
  <Fragment>
    <BrowserRouter>
      {cookiesModalVisible && <CookiesModal />}
      <Suspense fallback={<Loading display />}>
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
      </Suspense>
    </BrowserRouter>
  </Fragment>
);

const mapStateToProps = (state: IRootReducer) => ({
  cookiesModalVisible: state.session.cookiesModalVisible,
});

export default connect(mapStateToProps)(AppRouter);
