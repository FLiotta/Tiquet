import { BoardInterface } from '../interfaces/Board';
import BoardsService from '../services/boardsService';

const boardsService = new BoardsService();

export const FETCH_BOARDS: string = '[BOARDS] FETCH BOARDS';
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

export const addBoard = (id: number, title: string) => {
  const newBoard: BoardInterface = { id, title };

  return dispatch => {
    dispatch({
      type: ADD_BOARD,
      payload: newBoard
    });
  }
}