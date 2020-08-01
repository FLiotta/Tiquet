import { FETCH_PROFILE } from '../actions/profile';

const defaultState = {
  username: undefined,
  id: undefined,
  createdAt: undefined,
  boards: undefined
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case FETCH_PROFILE:
      return {
        ...action.payload.result
      };
    default:
      return state;
  }
}