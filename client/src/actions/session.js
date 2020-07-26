import ApiService from '../services/apiService';
const api = new ApiService();

export const LOG_IN = '[SESSION] LOG IN';

export const logIn = () => {
  return dispatch => {
    api.get('/boards/10')
      .then(response => console.log)
      .catch(e => console.log);
  }
}