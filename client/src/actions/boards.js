import BoardsService from '../services/boardsService';

const boardsService = new BoardsService();
export const FETCH_BOARDS = '[BOARDS] FETCH BOARDS';

export const fetchBoards = () => {
  return dispatch => boardsService.fetchBoards()
    .then(({data}) => {
      dispatch({
        type: FETCH_BOARDS,
        payload: data
      });
    })
}