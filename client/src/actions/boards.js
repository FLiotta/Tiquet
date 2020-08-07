import BoardsService from '../services/boardsService';

const boardsService = new BoardsService();

export const FETCH_BOARDS = '[BOARDS] FETCH BOARDS';
export const FETCH_BOARD = '[BOARDS] FETCH BOARD';

export const fetchBoards = () => {
  return dispatch => boardsService.fetchBoards()
    .then(({data}) => {
      dispatch({
        type: FETCH_BOARDS,
        payload: data
      });
    })
}

export const fetchBoard = (boardId) => {
  return dispatch => boardsService.fetchBoard(boardId)
    .then(({data}) => {
      console.log(data);
    })
    .catch(e => console.log);
}