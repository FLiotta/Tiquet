// @Packages
import Cookies from 'universal-cookie';

// @Project
import AuthService from '../services/authService';

const authService = new AuthService();
const cookies = new Cookies();

export const SESSION_FETCHING = '[SESSION] SESSION_FETCHING';
export const LOG_IN = '[SESSION] LOG IN';
export const SIGN_UP = '[SESSION] SIGN UP';
export const RECONNECT = '[SESSION] RECONNECT';

export const logIn = (username, password) => {
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
      .catch(e => console.log(e));
  }
}

export const signUp = (username, password) => {
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
      .catch(e => console.log(e));
  }
}

export const reconnect = () => {
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