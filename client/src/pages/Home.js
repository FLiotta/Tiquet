// @Packages
import React, { useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

// @Project
import Loading from '../components/Loading';
import Logo from '../assets/images/logo.png';
import '../styles/pages/Home.scss';
import { logIn, signUp } from '../actions/session';
import { isLoggedSelector } from '../selectors/session';

const Home = ({ login, signup, isLogged }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    const username = e.target.username.value;
    const password = e.target.password.value;

    login(username, password).then(() => {
      setLoading(false);
    });
  }

  const handleSignup = (e) => {
    e.preventDefault();

    setLoading(true);

    const username = e.target.username.value;
    const password = e.target.password.value;

    signup(username, password).then(() => {
      setLoading(false);
    });
  }

  const signForm = (handleAction, btnText) => (
    <form onSubmit={handleAction}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" className="form-control" placeholder="ex:. George Orwell" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" className="form-control" placeholder="********" />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn-primary btn-block">{btnText}</button>
      </div>
    </form>
  )

  return (
    <Fragment>
      {isLogged
        ? <Redirect to="/boards" />
        : (
          <div className="home-page">
            <div className="home-page__auth">
              <Loading display={loading} />
              <img src={Logo} className="home-page__logo" />
              {signForm(handleLogin, 'Login')}
              <hr />
              {signForm(handleSignup, 'Signup')}
            </div>
            <div className="home-page__display">
              {/* TODO: Design */}
            </div>
          </div>
        )
      }
    </Fragment>
  )
}

Home.propTypes = {
  login: propTypes.func,
  signup: propTypes.func,
  isLogged: propTypes.bool,
}

const mapStateToProps = state => ({
  isLogged: isLoggedSelector(state),
});

const dispatchToProps = dispatch => ({
  login: (username, password) => dispatch(logIn(username, password)),
  signup: (username, password) => dispatch(signUp(username, password)),
});

export default connect(mapStateToProps, dispatchToProps)(Home);