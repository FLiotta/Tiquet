import {
  LOG_IN,
  SIGN_UP,
  RECONNECT,
  SESSION_FETCHING,
  LOGOUT
} from '../actions/session';

export interface ISessionReducer {
  fetching: Boolean,
  token: string,
  user: {
    id: number,
    username: string
  },
};

const defaultState: ISessionReducer = {
  fetching: false,
  token: undefined,
  user: {
    id: undefined,
    username: '',
  }
};

export default (state: ISessionReducer = defaultState, action) => {
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
