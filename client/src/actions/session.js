import AuthService from '../services/authService';
const authService = new AuthService();

export const LOG_IN = '[SESSION] LOG IN';
export const SIGN_UP = '[SESSION] SIGN UP';

export const logIn = (username, password) => {
  return dispatch => {
    return authService.login(username, password)
      .then(({ data }) => {
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
        dispatch({
          type: SIGN_UP,
          payload: data
        })
      })
      .catch(e => console.log(e));
  }
}