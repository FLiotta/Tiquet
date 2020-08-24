import BoardsService from '../services/boardsService';

const boardsService = new BoardsService();

export const FETCH_BOARDS = '[BOARDS] FETCH BOARDS';
export const ADD_BOARD = '[BOARDS] ADD BOARD';

export const fetchBoards = () => {
  return dispatch => boardsService.fetchBoards()
    .then(({data}) => {
      dispatch({
        type: FETCH_BOARDS,
        payload: data
      });
    })
}

export const addBoard = (id, title) => {
  const newBoard = { id, title };

  return dispatch => {
    dispatch({
      type: ADD_BOARD,
      payload: newBoard
    });
  }
}