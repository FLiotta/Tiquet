import {
  SET_VISIBILITY,
  FETCH_TASK,
  SET_LOADING,
  RESET_STATE,
  UPDATE_DESCRIPTION,
  UPDATE_PRIORITY,
  UPDATE_TITLE,
} from "../actions/taskDescription";
import { TaskInterface } from "../interfaces/Task";

export interface ITaskDescriptionReducer {
  visible: Boolean,
  loading: Boolean,
  error: string,
  taskInfo: TaskInterface
};

const defaultState: ITaskDescriptionReducer = {
  visible: false,
  loading: false,
  taskInfo: undefined,
  error: '',
};

export default (state: ITaskDescriptionReducer = defaultState, action) => {
  switch (action.type) {
    case SET_VISIBILITY:
      return {
        ...state,
        visible: action.payload
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case FETCH_TASK:
      return {
        ...state,
        loading: false,
        taskInfo: action.payload,
      }
    case UPDATE_PRIORITY:
      return {
        ...state,
        loading: false,
        taskInfo: {
          ...state.taskInfo,
          priority: action.payload,
        },
      };
    case UPDATE_DESCRIPTION:
      return {
        ...state,
        loading: false,
        taskInfo: {
          ...state.taskInfo,
          description: action.payload,
        }
      }
    case UPDATE_TITLE:
      return {
        ...state,
        loading: false,
        taskInfo: {
          ...state.taskInfo,
          title: action.payload,
        }
      }
    case RESET_STATE:
      return defaultState;
    default:
      return state;
  }
}