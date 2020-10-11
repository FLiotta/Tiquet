// @Packages
import Cookies from 'universal-cookie';
import cogoToast from 'cogo-toast';

// @Project
import AuthService from '../services/authService';
import OAuthService from '../services/oauthService';

const authService = new AuthService();
const oauthService = new OAuthService();
const cookies = new Cookies();

export const SESSION_FETCHING = '[SESSION] SESSION_FETCHING';
export const LOG_IN = '[SESSION] LOG IN';
export const SIGN_UP = '[SESSION] SIGN UP';
export const RECONNECT = '[SESSION] RECONNECT';
export const LOGOUT = '[SESSION] LOGOUT';

export const logIn = (username: string, password: string) => {
  return dispatch => {
    dispatch({
      type: SESSION_FETCHING,
      payload: true
    });

    return authService.login(username, password)
      .then(({ data }) => {

        const { token } = data;
        cookies.set('token', token);

        dispatch({
          type: LOG_IN,
          payload: data
        })
      })
      .catch(e => {
        const { data, status } = e.response;
        const message = `${status} ${data.msg}`;
        
        cogoToast.error(message, { position: 'bottom-right' });

        dispatch({
          type: SESSION_FETCHING,
          payload: false
        });
      });
  }
}

export const signUp = (username: string, password: string) => {
  return dispatch => {
    dispatch({
      type: SESSION_FETCHING,
      payload: true
    });

    return authService.signup(username, password)
      .then(({ data }) => {

        const { token } = data;
        cookies.set('token', token);

        dispatch({
          type: SIGN_UP,
          payload: data
        })
      })
      .catch(e => {
        const { data, status } = e.response;
        const message = `${status} ${data.msg}`;

        cogoToast.error(message, { position: 'bottom-right' });

        dispatch({
          type: SESSION_FETCHING,
          payload: false
        });
      });
  }
}

export const oauthGithub = (code: string, state: string) => {
  return dispatch => {
    dispatch({
      type: SESSION_FETCHING,
      payload: true
    });

    return oauthService.github(code, state)
      .then(({ data }) => {

        const { token } = data;
        cookies.set('token', token);

        dispatch({
          type: SIGN_UP,
          payload: data
        })
      })
      .catch(e => {
        dispatch({
          type: SESSION_FETCHING,
          payload: false
        });
      });
  }
}

export const reconnect = (): any => {
  return dispatch => {
    dispatch({
      type: SESSION_FETCHING,
      payload: true
    });

    return authService.reconnect()
      .then(({ data }) => {
        dispatch({
          type: RECONNECT,
          payload: data
        });
      })
      .catch(e => console.log(e));
  }
}

export const logout = () => {
  return dispatch => {
    cookies.remove('token');

    dispatch({
      type: LOGOUT
    });
  }
}