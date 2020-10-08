// Packages
import cogoToast from 'cogo-toast';

// Project
import BoardsService from '../services/boardsService';
import ListsService from '../services/listsService';
import TasksService from '../services/tasksService';
import PrioritiesService from '../services/prioritiesService';
import { IRootReducer } from '../reducers/rootReducer';
import { IList } from '../interfaces/List';
import ListService from '../services/listsService';

const prioritiesService = new PrioritiesService();
const taskService = new TasksService();
const boardsService = new BoardsService();
const listsService = new ListsService();

export const FETCH_BOARD: string = '[BOARDS] FETCH BOARD';
export const MOVE_TASK: string = '[BOARD] MOVE TASK';
export const UPDATE_TASK_PRIORITY: string = '[BOARD] UPDATE TASK PRIORITY';
export const ADD_TASK: string = '[BOARD] ADD TASK';
export const ADD_LIST: string = '[BOARD] ADD LIST';
export const RESET_STATE: string = '[BOARD] CLEAN STATE';
export const DELETE_TASK: string = '[BOARD] DELETE TASK';
export const DELETE_LIST: string = '[BOARD] DELETE LIST';
export const FETCH_PRIORITIES: string = '[BOARD] FETCH PRIORITIES';
export const EDIT_LIST_TITLE: string = '[BOARD] EDIT LIST TITLE';
export const UPDATE_TASK_TITLE: string = '[BOARD] UPDATE_TASK_TITLE';
export const SET_LISTS: string = '[BOARD] SET_LISTS';
export const SORT_LIST: string = '[BOARD] SORT_LIST';
export const ORDER_TASKS: string = '[BOARD] ORDER_TASKS';

export const sortList = (listId: number, taskId: number, index: number, destinationIndex: number) => {
  return (dispatch, getState) => {
    const state: IRootReducer = getState();
    const list: any = new Object(state.board.lists.find(list => list.id === listId));

    const [task] = list.tasks.splice(index, 1);
    list.tasks.splice(destinationIndex, 0, task);

    const order = list.tasks.map(task => task.id);

    return listsService.sortTasks(listId, order)
      .then(({ data }) => {
        dispatch({
          type: ORDER_TASKS,
          payload: {
            listId,
            tasks: list.tasks
          }
        })
      })
  }
}
export const editListTitle = (listId: number, title: string) => {
  return dispatch => listsService.editTitle(listId, title)
    .then(({ data }) => {
      dispatch({
        type: EDIT_LIST_TITLE,
        payload: {
          listId,
          title,
        }
      });
    })
    .catch(e => console.log);
};

export const fetchBoard = (boardId: number) => {
  return dispatch => boardsService.fetchBoard(boardId)
    .then(({ data }) => {
      dispatch({
        type: FETCH_BOARD,
        payload: data
      });
    })
    .catch(e => {
      window.location.href = "/404";
    });
}

export const updateTaskPriority = (taskId: number, priorityId: number) => {
  return dispatch => dispatch({
    type: UPDATE_TASK_PRIORITY,
    payload: { taskId, priorityId },
  });
}

export const updateTaskTitle = (taskId: number, title: string) => {
  return dispatch => dispatch({
    type: UPDATE_TASK_TITLE,
    payload: { taskId, title },
  });
}

export const fetchPriorities = () => {
  return dispatch => prioritiesService.fetchPriorities()
    .then(({ data }) => {
      dispatch({
        type: FETCH_PRIORITIES,
        payload: data.result
      });
    });
}

export const addList = (boardId: number, title: string) => {
  return dispatch => boardsService.createList(boardId, title)
    .then(({ data }) => {
      cogoToast.success(`Your list has been created.`, { position: 'bottom-right' });

      dispatch({
        type: ADD_LIST,
        payload: data
      });
    })
    .catch(e => {
      cogoToast.error(`There was a problem creating your list.`, { position: 'bottom-right' });
    });
}

export const deleteList = (listId: number) => {
  return dispatch => listsService.deleteList(listId)
    .then(({ data }) => {
      cogoToast.info(`List deleted.`, { position: 'bottom-right' });

      dispatch({
        type: DELETE_LIST,
        payload: listId,
      });
    })
    .catch(() => {
      cogoToast.error(`There was a problem deleting your list.`, { position: 'bottom-right' });
    })
}

export const addTask = (taskTitle: string, listId: number) => {
  return dispatch => listsService.createTask(taskTitle, listId)
    .then(({ data }) => {
      cogoToast.success(`Your task has been created 😊`, { position: 'bottom-right' });

      dispatch({
        type: ADD_TASK,
        payload: { listId, newTask: data.result }
      });
    })
    .catch(e => {
      cogoToast.error(`Whops... we couldn't create your task.`, { position: 'bottom-right' });
    });
}

export const moveTask = (originListId: number, destinyListId: number, taskId: number, destinationIndex: number) => {
  return (dispatch, getState) => {
    const state: IRootReducer = getState();
    const previousListsState: IList[] = state.board.lists;

    dispatch({
      type: MOVE_TASK,
      payload: { destinyListId, originListId, taskId, destinationIndex },
    });

    taskService.updateList(taskId, destinyListId, destinationIndex)
      .then(resp => { })
      .catch(e => {
        cogoToast.error(`There was a problem updating your task.`, { position: 'bottom-right' });
        dispatch({
          type: SET_LISTS,
          payload: previousListsState,
        });
      });
  }
};

export const deleteTask = (taskId: number) => {
  return (dispatch, getState) => {
    const state: IRootReducer = getState();
    const previousListsState: IList[] = state.board.lists;

    dispatch({
      type: DELETE_TASK,
      payload: { taskId }
    });

    taskService.deleteTask(taskId)
      .then(() => {
        cogoToast.info(`Task deleted.`, { position: 'bottom-right' });
      })
      .catch(() => {
        cogoToast.error(`There was a problem deleting your task.`, { position: 'bottom-right' });
        dispatch({
          type: SET_LISTS,
          payload: previousListsState
        });
      })
  }
}

export const resetState = () => {
  return dispatch => dispatch({
    type: RESET_STATE
  });
}