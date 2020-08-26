import { FETCH_BOARD, MOVE_TASK, ADD_LIST } from '../actions/board';

const defaultState = {
  id: undefined,
  title: '',
  lists: [],
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case FETCH_BOARD:
      return action.payload;
    case MOVE_TASK:
      return {
        ...state,
        lists: action.payload
      };
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, action.payload]
      };
    default:
      return state;
  }
}