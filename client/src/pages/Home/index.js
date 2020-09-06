// Packages
import React, { useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

// Project
import Loading from '../../components/Loading';
import { logIn, signUp } from '../../actions/session';
import { isLoggedSelector } from '../../selectors/session';
import './styles.scss';

const Home = ({ login, signup, isLogged }) => {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(true);

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
        <input type="text" id="username" placeholder="ex:. George Orwell" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder="********" />
      </div>
      <div className="form-group">
        <button type="submit" className="btn btn--block">{btnText}</button>
      </div>
    </form>
  )

  const toggleMode = () => setMode(!mode);

  return (
    <Fragment>
      {isLogged
        ? <Redirect to="/boards" />
        : (
          <div className="home-page">
            <div className="home-page__auth">
              <Loading display={loading} />
              <h1 className="home-page__auth-title text-primary">TIQUET</h1>
              {mode 
                ? 
                <Fragment>
                  {signForm(handleLogin, 'Login')}
                  <a 
                    href="#"
                    onClick={toggleMode} 
                    className="home-page__auth-footer">
                    I don't have an account 😢
                  </a>
                </Fragment>
                : 
                <Fragment>
                  {signForm(handleSignup, 'Sign Up')}
                  <a 
                    href="#"
                    onClick={toggleMode} 
                    className="home-page__auth-footer">
                    Already have an account 🤓
                  </a>
                </Fragment>
              }
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