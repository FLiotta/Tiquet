// Project
import TasksService from '../services/tasksService';

const taskService = new TasksService();

export const SET_VISIBILITY = '[TASK DESCRIPTION] SET VISIBILITY';
export const SET_LOADING = '[TASK DESCRIPTION] SET LOADING';
export const FETCH_TASK = '[TASK DESCRIPTION] FETCH TASK';
export const RESET_STATE = '[TASK DESCRIPTION] RESET STATE';

export const setVisibility = (state) => {
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

export const setLoading = (state) => {
  return dispatch => dispatch({
    type: SET_LOADING,
    payload: state
  });
}

export const fetchTask = taskId => {
  return dispatch => {
    dispatch(setVisibility(true));
    dispatch(setLoading(true));
    
    return taskService.fetchTask(taskId)
      .then(({data}) => {
        dispatch({
          type: FETCH_TASK,
          payload: data
        });
      })
  }
}