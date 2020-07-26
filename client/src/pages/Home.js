// @Packages
import React from 'react';
import { connect } from 'react-redux';

// @Project
import Logo from '../assets/images/logo.png';
import '../styles/pages/Home.scss';
import { logIn } from '../actions/session';

const Home = (props) => {
  const handleLogin = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    props.login();
  }

  return (
    <div className="home-page">
      <div className="home-page__auth">
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

const stateToProps = state => ({
  session: state.session
});

const dispatchToProps = dispatch => ({
  login: () => dispatch(logIn())
})

export default connect(stateToProps, dispatchToProps)(Home);