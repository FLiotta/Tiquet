// Packages
import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

// Project
import Loading from '../../components/Loading';
import { logIn, signUp } from '../../actions/session';
import { isLoggedSelector } from '../../selectors/session';
import './styles.scss';

const AuthForm = ({ onSubmit, btnText }) => {
  const { handleSubmit, register, errors } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="auth__modal-form-node">
        <input
          type="text"
          name="username"
          ref={register({ required: "Required" })}
          placeholder="Username" />
      </div>
      <div className="auth__modal-form-node">
        <input
          type="password"
          name="password"
          ref={register({ required: "Required" })}
          placeholder="Password" />
      </div>
      <div className="auth__modal-form-node">
        <button type="submit" className="btn btn--block">{btnText}</button>
      </div>
    </form>
  );
}

const Auth = ({ login, signup, isLogged }) => {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(true);

  const handleLogin = ({ username, password }) => {
    setLoading(true);

    login(username, password).then(() => {
      setLoading(false);
    });
  }

  const handleSignup = ({ username, password }) => {
    setLoading(true);

    signup(username, password).then(() => {
      setLoading(false);
    });
  }

  const toggleMode = (e) => {
    e.preventDefault();
    setMode(!mode);
  };

  return (
    <Fragment>
      {isLogged && <Redirect to="/boards" />}

      <div className="auth">
        <div className="auth__modal">
          <Loading display={loading} />
          <h1 className="auth__modal-title text-primary">TIQUET</h1>
          <div className="auth__modal-body">
            {mode
              ? <AuthForm onSubmit={handleLogin} btnText="Login" />
              : <AuthForm onSubmit={handleSignup} btnText="Sign Up" />
            }
          </div>
          <div className="auth__modal-footer">
            <a href="#" onClick={toggleMode}>
              {mode ? "I don't have an account 😢" : "Already have an account 🤓"}
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

AuthForm.propTypes = {
  btnText: propTypes.string,
  onSubmit: propTypes.func.isRequired,
}

Auth.propTypes = {
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

export default connect(mapStateToProps, dispatchToProps)(Auth);