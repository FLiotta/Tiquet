// @Packages
import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import { connect } from 'react-redux';

// @Project
import Loading from '../components/Loading';
import Logo from '../assets/images/logo.png';
import '../styles/pages/Home.scss';
import { logIn } from '../actions/session';

const Home = ({ login }) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);

    const username = e.target.username.value;
    const password = e.target.password.value;

    login(username, password).then(() => setLoading(false));
  }

  return (
    <div className="home-page">
      <div className="home-page__auth">
        <Loading display={loading} />
        <img src={Logo} className="home-page__logo" />
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" className="form-control" placeholder="ex:. George Orwell" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="form-control" placeholder="********" />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">Log In</button>
          </div>
        </form>
      </div>
      <div className="home-page__display">
      </div>
    </div>
  )
}

Home.propTypes = {
  login: propTypes.func,
}

const dispatchToProps = dispatch => ({
  login: (username, password) => dispatch(logIn(username, password))
})

export default connect(undefined, dispatchToProps)(Home);