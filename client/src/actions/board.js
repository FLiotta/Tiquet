import BoardsService from '../services/boardsService';

const boardsService = new BoardsService();

export const FETCH_BOARD = '[BOARDS] FETCH BOARD';

export const fetchBoard = (boardId) => {
  return dispatch => boardsService.fetchBoard(boardId)
    .then(({data}) => {
      dispatch({
        type: FETCH_BOARD,
        payload: data
      });
    })
    .catch(e => console.log);
}