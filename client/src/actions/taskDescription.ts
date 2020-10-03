// Project
import { selectPriorities } from '../selectors/board';
import TasksService from '../services/tasksService';

const taskService = new TasksService();

export const SET_VISIBILITY = '[TASK DESCRIPTION] SET VISIBILITY';
export const UPDATE_PRIORITY = '[TASK DESCRIPTION] UPDATE PRIORITY';
export const SET_LOADING = '[TASK DESCRIPTION] SET LOADING';
export const FETCH_TASK = '[TASK DESCRIPTION] FETCH TASK';
export const UPDATE_DESCRIPTION = '[TASK DESCRIPTION] UPDATE DESCRIPTION';
export const UPDATE_TITLE = '[TASK DESCRIPTION] UPDATE TITLE';
export const RESET_STATE = '[TASK DESCRIPTION] RESET STATE';

export const setVisibility = (state: Boolean) => {
  return dispatch => dispatch({
    type: SET_VISIBILITY,
    payload: state,
  });
};

export const resetState = () => {
  return dispatch => dispatch({
    type: RESET_STATE,
  });
};

export const setLoading = (state: Boolean) => {
  return dispatch => dispatch({
    type: SET_LOADING,
    payload: state
  });
}

export const updateDescription = (taskId: number, description: string) => {
  return dispatch => {
    dispatch(setLoading(true));

    return taskService.updateDescription(taskId, description)
      .then(({ data }) => {
        dispatch({
          type: UPDATE_DESCRIPTION,
          payload: description
        });
      });
  }
}

export const updateTitle = (taskId: number, title: string) => {
  return dispatch => {
    dispatch(setLoading(true));

    return taskService.updateTitle(taskId, title)
      .then(({ data }) => {
        dispatch({
          type: UPDATE_TITLE,
          payload: title
        });
      });
  }
}

export const updatePriority = (taskId: number, priorityId: number) => {
  return (dispatch, getState) => {
    dispatch(setLoading(true));

    const state = getState();
    const priorities = selectPriorities(state);
    const priority = priorities.find(priority => priority.id == priorityId);

    return taskService.updatePriority(taskId, priorityId)
      .then(() => {
        dispatch({
          type: UPDATE_PRIORITY,
          payload: priority.value
        });
      });
  }
}

export const fetchTask = (taskId: number) => {
  return dispatch => {
    dispatch(setVisibility(true));
    dispatch(setLoading(true));

    return taskService.fetchTask(taskId)
      .then(({ data }) => {
        dispatch({
          type: FETCH_TASK,
          payload: data
        });
      })
  }
}