import { FETCH_BOARDS, ADD_BOARD, FILTER_BOARD } from '../actions/boards';
import { BoardInterface } from '../interfaces/Board';

export interface IBoardsReducer {
  result: BoardInterface[],
  error: string
};

const defaultState: IBoardsReducer = {
  result: [],
  error: ''
};

export default (state: IBoardsReducer = defaultState, action) => {
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
      };
    case FILTER_BOARD:
      return {
        ...state,
        result: state.result.filter(board => board.id != action.payload.id),
      };
    default:
      return state;
  }
}