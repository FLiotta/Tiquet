// Packages
import cogoToast from 'cogo-toast';

// Project
import BoardsService from '../services/boardsService';
import ListsService from '../services/listsService';
import TasksService from '../services/tasksService';
import PrioritiesService from '../services/prioritiesService';
import { IRootReducer } from '../reducers/rootReducer';
import { PriortyInterface } from '../interfaces/Priority';
import { ListInterface } from '../interfaces/List';
import { selectPriorities } from '../selectors/board';
import { BoardInterface } from '../interfaces/Board';
import { TaskInterface } from '../interfaces/Task';
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
  return (dispatch, getState) => {
    const state: IRootReducer = getState();
    const priorities: PriortyInterface[] = selectPriorities(state);
    const priority: PriortyInterface = priorities.find(priority => priority.id == priorityId);

    const updatedLists: ListInterface[] = state.board.lists.map(list => ({
      ...list,
      tasks: list.tasks.map(task => task.id === taskId ? { ...task, priority: priority.value } : task)
    }));

    return dispatch({
      type: UPDATE_TASK_PRIORITY,
      payload: updatedLists,
    });
  }
}

export const updateTaskTitle = (taskId: number, title: string) => {
  return (dispatch, getState) => {
    const state: IRootReducer = getState();

    const updatedLists: ListInterface[] = state.board.lists.map(list => ({
      ...list,
      tasks: list.tasks.map(task => task.id === taskId ? { ...task, title } : task)
    }));

    return dispatch({
      type: UPDATE_TASK_TITLE,
      payload: updatedLists,
    });
  }
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
  return (dispatch, getState) => listsService.createTask(taskTitle, listId)
    .then(({ data }) => {
      const state: IRootReducer = getState();
      const mappedListsWithTask: ListInterface[] = state.board.lists.map(list => list.id === listId
        ? {
          ...list,
          tasks: [...list.tasks, data.result]
        }
        : list);

      cogoToast.success(`Your task has been created 😊`, { position: 'bottom-right' });

      dispatch({
        type: ADD_TASK,
        payload: mappedListsWithTask
      });
    })
    .catch(e => {
      cogoToast.error(`Whops... we couldn't create your task.`, { position: 'bottom-right' });
    });
}

export const moveTask = (originListId: number, destinyListId: number, taskId: number) => {
  return (dispatch, getState) => {
    const state: IRootReducer = getState();
    const board: BoardInterface = state.board;
    const previousListsState: ListInterface[] = board.lists;
    const task: TaskInterface = board.lists
      .flatMap(list => list.tasks)
      .find(task => task.id == taskId);

    const updatedLists: ListInterface[] = board.lists.map(list => {
      if (list.id == destinyListId) {
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

    taskService.updateList(taskId, destinyListId)
      .then(resp => { })
      .catch(e => {
        cogoToast.error(`There was a problem updating your task.`, { position: 'bottom-right' });
        dispatch({
          type: MOVE_TASK,
          payload: previousListsState,
        });
      });
  }
};

export const deleteTask = (taskId: number) => {
  return (dispatch, getState) => {
    const state: IRootReducer = getState();
    const previousListsState: ListInterface[] = state.board.lists;

    const mappedListsWithNewTask: ListInterface[] = state.board.lists.map(list => {
      const containsTask: Boolean = list.tasks.some(task => task.id == taskId);

      if (containsTask) {
        return {
          ...list,
          tasks: list.tasks.filter(task => task.id != taskId)
        };
      }
      return list;
    });

    dispatch({
      type: DELETE_TASK,
      payload: mappedListsWithNewTask
    });

    taskService.deleteTask(taskId)
      .then(() => {
        cogoToast.info(`Task deleted.`, { position: 'bottom-right' });
      })
      .catch(() => {
        cogoToast.error(`There was a problem deleting your task.`, { position: 'bottom-right' });
        dispatch({
          type: DELETE_TASK,
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