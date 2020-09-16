// Packages
import React, { useState, Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import qs from 'qs';

// Project
import Loading from '../../components/Loading';
import { logIn, signUp } from '../../actions/session';
import { isLoggedSelector } from '../../selectors/session';
import './styles.scss';

interface IAccount {
  username: string,
  password: string
};

interface IPropsForm {
  onSubmit: Function,
  btnText: string
};

const AuthForm = ({ onSubmit, btnText }: IPropsForm): JSX.Element => {
  const { handleSubmit, register, errors } = useForm();

  return (
    <form onSubmit={handleSubmit((e) => onSubmit(e))}>
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

interface IAuthProps {
  login: Function,
  signup: Function,
  isLogged: Boolean,
  location: any
};

const Auth = ({
  login,
  signup,
  isLogged,
  location,
}: IAuthProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(true);

  useEffect(() => {
    const queryParameters: any = qs.parse(location.search, { ignoreQueryPrefix: true });

    if(queryParameters.mode) {
      const preselectedMode: boolean = queryParameters.mode === "login" ? true : false;
      setMode(preselectedMode);
    }
  }, []);

  const handleLogin = ({ username, password }: IAccount) => {
    setLoading(true);

    login(username, password).then(() => {
      setLoading(false);
    });
  }

  const handleSignup = ({ username, password }: IAccount) => {
    setLoading(true);

    signup(username, password).then(() => {
      setLoading(false);
    });
  }

  const toggleMode = (e: any) => {
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
            <a href="#" onClick={toggleMode} className="auth__modal-footer__toggler">
              {mode ? "I don't have an account 😭" : "Already have an account 🤓"}
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  isLogged: isLoggedSelector(state),
});

const dispatchToProps = dispatch => ({
  login: (username, password) => dispatch(logIn(username, password)),
  signup: (username, password) => dispatch(signUp(username, password)),
});

export default connect(mapStateToProps, dispatchToProps)(Auth);