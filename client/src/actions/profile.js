import UserService from '../services/userService';

const userService = new UserService();

export const FETCH_PROFILE = '[PROFILE] FETCH PROFILE';

export const fetchProfile = () => {
  return dispatch => {
    return userService.profile()
      .then(({data}) => {
        dispatch({
          type: FETCH_PROFILE,
          payload: data
        });
      })
  }
}