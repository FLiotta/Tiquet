import { FETCH_BOARD } from '../actions/board';

const defaultState = {
  id: undefined,
  title: '',
  lists: [],
};

export default (state = defaultState, actions) => {
  switch(actions.type) {
    case FETCH_BOARD:
      return actions.payload;
    default:
      return state;
  }
}