import { FETCH_BOARDS } from '../actions/boards';

const defaultState = {
  result: [],
  error: ''
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_BOARDS:
      return {
        ...state,
        result: action.payload
      };
    default:
      return state;
  }
}