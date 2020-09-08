// Packages
import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// Project
import { isLoggedSelector } from '../../selectors/session';

const ProtectedRoute = ({ fetching, isLogged, component: Component, ...rest }) => {
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

ProtectedRoute.propTypes = {
  isLogged: propTypes.bool,
  component: propTypes.any,
}

const mapStateToProps = state => ({
  isLogged: isLoggedSelector(state),
  fetching: state.session.fetching,
});

export default connect(mapStateToProps)(ProtectedRoute);