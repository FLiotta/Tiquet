import { 
  FETCH_BOARD,
  MOVE_TASK,
  ADD_LIST,
  ADD_TASK,
  RESET_STATE,
  DELETE_TASK,
} from '../actions/board';

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
    case ADD_TASK:
      return {
        ...state,
        lists: action.payload
      };
    case DELETE_TASK:
      return {
        ...state,
        lists: action.payload,
      };
    case RESET_STATE:
      return defaultState;
    default:
      return state;
  }
}