import { BoardInterface } from '../interfaces/Board';
import { IRootReducer } from '../reducers/rootReducer';
import BoardsService from '../services/boardsService';

const boardsService = new BoardsService();

export const FETCH_BOARDS: string = '[BOARDS] FETCH BOARDS';
export const FILTER_BOARD: string = '[BOARDS] FILTER BOARD';
export const ADD_BOARD: string = '[BOARDS] ADD BOARD';

export const fetchBoards = () => {
  return dispatch => boardsService.fetchBoards()
    .then(({data}) => {
      dispatch({
        type: FETCH_BOARDS,
        payload: data
      });
    })
}

export const filterBoard = (id: number) => {
  return (dispatch, getState) => {
    const state: IRootReducer = getState();
    const filteredBoards: BoardInterface[] = state.boards.result.filter(board => board.id !== id);

    dispatch({
      type: FILTER_BOARD,
      payload: filteredBoards
    });
  }
}

export const addBoard = (id: number, title: string) => {
  const newBoard: BoardInterface = { id, title };

  return dispatch => {
    dispatch({
      type: ADD_BOARD,
      payload: newBoard
    });
  }
}