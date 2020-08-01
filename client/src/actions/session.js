// @Packages
import Cookies from 'universal-cookie';

// @Project
import AuthService from '../services/authService';

const authService = new AuthService();
const cookies = new Cookies();

export const LOG_IN = '[SESSION] LOG IN';
export const SIGN_UP = '[SESSION] SIGN UP';
export const RECONNECT = '[SESSION] RECONNECT';

export const logIn = (username, password) => {
  return dispatch => {
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
    return authService.reconnect()
      .then(({data}) => {
        dispatch({
          type: RECONNECT,
          payload: data
        });
      })
      .catch(e => console.log(e));      
  }
}