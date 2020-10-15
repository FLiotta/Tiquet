// Packages
import React, { useState, Fragment, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import qs from 'qs';

// Project
import { trackPageView } from '../../utils/ga';
import Loading from '../../components/Loading';
import GithubOAuth from '../../components/OAuth/Github';
import { logIn, signUp, oauthGithub } from '../../actions/session';
import { isLoggedSelector, isSessionFetching } from '../../selectors/session';
import { RECAPTCHA_SITE_KEY, RECAPTCHA_AVAILABLE } from '../../config';
import './styles.scss';

interface IAccount {
  username: string,
  password: string
};

interface IPropsForm {
  onSubmit: Function,
  btnText: string
};

export const AuthForm = ({ onSubmit, btnText }: IPropsForm): JSX.Element => {
  const [recaptchaStatus, setRecaptchaStatus] = useState(false);
  const { handleSubmit, register, errors } = useForm();

  return (
    <form onSubmit={handleSubmit((e) => {
      if (recaptchaStatus || !RECAPTCHA_AVAILABLE) {
        onSubmit(e)
      }
    })}>
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
      {RECAPTCHA_AVAILABLE &&
        <ReCAPTCHA
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={() => setRecaptchaStatus(true)}
          onExpired={() => setRecaptchaStatus(false)}
        />
      }
      <div className="auth__modal-form-node">
        <button type="submit" className="btn btn--block">{btnText}</button>
      </div>
    </form>
  );
}

interface IAuthProps {
  login: Function,
  signup: Function,
  oauthGithub(code: string, state: string): any,
  isLogged: Boolean,
  fetching: Boolean,
  location: any
};

const Auth = ({
  login,
  signup,
  fetching,
  isLogged,
  location,
  oauthGithub,
}: IAuthProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(true);

  useEffect(() => {
    const queryParameters: any = qs.parse(location.search, { ignoreQueryPrefix: true });

    if (queryParameters.mode) {
      const preselectedMode: boolean = queryParameters.mode === "login" ? true : false;
      setMode(preselectedMode);
    }

    trackPageView('Auth');
  }, []);

  const handleLogin = ({ username, password }: IAccount) => {
    login(username, password)
  }

  const handleSignup = ({ username, password }: IAccount) => {
    signup(username, password);
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
          <Loading display={fetching} />
          <h1 className="auth__modal-title text-primary">TIQUET</h1>
          <div className="auth__modal-body">
            {mode
              ? <AuthForm onSubmit={handleLogin} btnText="Login" />
              : <AuthForm onSubmit={handleSignup} btnText="Sign Up" />
            }
          </div>
          <div className="auth__modal-footer">
            <GithubOAuth
              text={mode ? "Log in with Github" : "Sign up with Github"}
              onSuccess={(code, state) => oauthGithub(code, state)}
            />
            <div className="auth__modal-footer__toggler">
              <a href="#" onClick={toggleMode}>
                {mode ? "I don't have an account" : "Already have an account"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  isLogged: isLoggedSelector(state),
  fetching: isSessionFetching(state),
});

const dispatchToProps = dispatch => ({
  login: (username, password) => dispatch(logIn(username, password)),
  signup: (username, password) => dispatch(signUp(username, password)),
  oauthGithub: (code, state) => dispatch(oauthGithub(code, state)),
});

export default connect(mapStateToProps, dispatchToProps)(Auth);