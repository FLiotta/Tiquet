import { FETCH_BOARDS, ADD_BOARD } from '../actions/boards';

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
    case ADD_BOARD:
      return {
        ...state,
        result: [...state.result, action.payload]
      }
    default:
      return state;
  }
}