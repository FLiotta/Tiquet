import cogoToast from 'cogo-toast';
import BoardsService from '../services/boardsService';
import ListsService from '../services/listsService';

const boardsService = new BoardsService();
const listsService = new ListsService();

export const FETCH_BOARD = '[BOARDS] FETCH BOARD';
export const MOVE_TASK = '[BOARD] MOVE TASK';
export const ADD_TASK = '[BOARD] ADD TASK';
export const ADD_LIST = '[BOARD] ADD LIST';

export const fetchBoard = (boardId) => {
  return dispatch => boardsService.fetchBoard(boardId)
    .then(({data}) => {
      dispatch({
        type: FETCH_BOARD,
        payload: data
      });
    })
    .catch(e => {
      cogoToast.error(`Board can't be fetched... weird.`, { position: 'bottom-right'});
    });
}

export const addList = (boardId, title) => {
  return dispatch => boardsService.createList(boardId, title)
    .then(({ data }) => {
      cogoToast.success(`Your list has been created.`, { position: 'bottom-right'});

      dispatch({
        type: ADD_LIST,
        payload: data
      });
    })
    .catch(e => {
      cogoToast.error(`There was a problem creating your list.`, { position: 'bottom-right'});
    });
}

export const addTask = (taskTitle, listId) => {
  return (dispatch, getState) => listsService.createTask(taskTitle, listId)
    .then(({ data }) => {
      const state = getState();
      const mappedListsWithTask = state.board.lists.map(list => list.id === listId
        ? {
          ...list,
          tasks: [...list.tasks, data.result]
        }
        : list);

      cogoToast.success(`Your task has been created 😊`, { position: 'bottom-right'});

      dispatch({
        type: ADD_TASK,
        payload: mappedListsWithTask
      });
    })
    .catch(e => {
      cogoToast.error(`Whops... we couldn't create your task.`, { position: 'bottom-right'});
    });
}

export const moveTask = (originListId, destinyListId, taskId) => {
  return (dispatch, getState) => {
    const { board } = getState();
    const previousListsState = board.lists;
    const task = board.lists
      .flatMap(list => list.tasks)
      .find(task => task.id == taskId);

    const updatedLists = board.lists.map(list => {
      if(list.id == destinyListId) {
        return {
          ...list,
          tasks: [...list.tasks, task]
        };
      } else if (list.id == originListId) {
        return {
          ...list,
          tasks: list.tasks.filter(task => task.id != taskId)
        }
      }

      return list;
    });

    dispatch({
      type: MOVE_TASK,
      payload: updatedLists,
    });

    listsService.updateTask(taskId, destinyListId)
      .then(resp => { })
      .catch(e => {
        cogoToast.error(`There was a problem updating your task.`, { position: 'bottom-right'});
        dispatch({
          type: MOVE_TASK,
          payload: previousListsState,
        });
      });
  }
};