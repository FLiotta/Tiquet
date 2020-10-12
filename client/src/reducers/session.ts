import Cookies from 'universal-cookie';
import {
  LOG_IN,
  SIGN_UP,
  RECONNECT,
  SESSION_FETCHING,
  LOGOUT,
  TOGGLE_COOKIES_MODAL
} from '../actions/session';

const cookies = new Cookies();

export interface ISessionReducer {
  fetching: Boolean,
  token: string,
  user: {
    id: number,
    username: string
  },
  cookiesModalVisible: Boolean,
};

const defaultState: ISessionReducer = {
  fetching: false,
  token: undefined,
  user: {
    id: undefined,
    username: '',
  },
  cookiesModalVisible: cookies.get('hasSeenCookiesModal') ? false : true
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
    case TOGGLE_COOKIES_MODAL:
      return {
        ...state,
        cookiesModalVisible: !state.cookiesModalVisible,
      };
    case LOGOUT:
      return defaultState;
    default:
      return state;
  }
}
