import AuthService from '../services/authService';
const authService = new AuthService();

export const LOG_IN = '[SESSION] LOG IN';

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