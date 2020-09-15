// Packages
import React, { ComponentType, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// Project
import { isLoggedSelector } from '../../selectors/session';

interface IProps {
  fetching: Boolean,
  isLogged: Boolean,
  component: ComponentType
};

const ProtectedRoute = ({
  fetching,
  isLogged,
  component: Component,
  ...rest
}: Partial<IProps>): JSX.Element => {
  return (
    <Fragment>
      {!fetching && (
        isLogged
          ? <Route {...rest} render={props => <Component {...rest} {...props} />} />
          : <Redirect to="/auth?mode=login" />
      )
      }
    </Fragment>
  );
}

const mapStateToProps = state => ({
  isLogged: isLoggedSelector(state),
  fetching: state.session.fetching,
});

export default connect(mapStateToProps)(ProtectedRoute);