import { SET_VISIBILITY, FETCH_TASK, SET_LOADING, RESET_STATE, UPDATE_DESCRIPTION } from "../actions/taskDescription";

const defaultState = {
  visible: false,
  loading: false,
  taskInfo: {},
  error: '',
};

export default (state = defaultState, action) => {
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
    case UPDATE_DESCRIPTION:
      return {
        ...state,
        loading: false,
        taskInfo: {
          ...state.taskInfo,
          description: action.payload,
        }
      }
    case RESET_STATE:
      return defaultState;
    default:
      return state;
  }
}