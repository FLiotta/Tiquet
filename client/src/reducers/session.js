import { LOG_IN, SIGN_UP, RECONNECT, SESSION_FETCHING, LOGOUT } from '../actions/session';

const defaultState = {
  fetching: false,
  token: undefined,
  user: {
    id: '',
    username: '',
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LOG_IN:
    case SIGN_UP:
    case RECONNECT:
      return {
        ...state,
        token: action.payload.token,
        user: {
          id: action.payload.id,
          username: action.payload.username,
        },
        fetching: false
      }
    case SESSION_FETCHING:
      return {
        ...state,
        fetching: action.payload,
      }
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
}
