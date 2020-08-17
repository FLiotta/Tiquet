import { FETCH_BOARD, MOVE_TASK } from '../actions/board';

const defaultState = {
  id: undefined,
  title: '',
  lists: [],
};

export default (state = defaultState, actions) => {
  switch(actions.type) {
    case FETCH_BOARD:
      return actions.payload;
    case MOVE_TASK:
      return {
        ...state,
        lists: actions.payload
      };
    default:
      return state;
  }
}