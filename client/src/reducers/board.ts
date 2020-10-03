import { PriortyInterface } from '../interfaces/Priority';
import { BoardInterface } from '../interfaces/Board';

import {
  FETCH_BOARD,
  MOVE_TASK,
  ADD_LIST,
  ADD_TASK,
  RESET_STATE,
  DELETE_TASK,
  FETCH_PRIORITIES,
  UPDATE_TASK_PRIORITY,
  DELETE_LIST,
  EDIT_LIST_TITLE,
  UPDATE_TASK_TITLE,
} from '../actions/board';

export interface IBoardReducer extends BoardInterface { };

const defaultState: IBoardReducer = {
  id: undefined,
  title: '',
  lists: [],
  priorities: [],
};

export default (state: IBoardReducer = defaultState, action) => {
  switch (action.type) {
    case FETCH_BOARD:
      return {
        ...state,
        ...action.payload,
      };
    case FETCH_PRIORITIES:
      return {
        ...state,
        priorities: action.payload,
      };
    case EDIT_LIST_TITLE:
      return {
        ...state,
        lists: state.lists.map(list => {
          if (list.id == action.payload.listId) {
            return {
              ...list,
              title: action.payload.title,
            };
          }

          return list;
        })
      };
    case UPDATE_TASK_PRIORITY:
      return {
        ...state,
        lists: action.payload
      };
    case UPDATE_TASK_TITLE:
      return {
        ...state,
        lists: action.payload
      };
    case MOVE_TASK:
      return {
        ...state,
        lists: action.payload
      };
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, action.payload]
      };
    case ADD_TASK:
      return {
        ...state,
        lists: action.payload
      };
    case DELETE_TASK:
      return {
        ...state,
        lists: action.payload,
      };
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter(list => list.id !== action.payload),
      }
    case RESET_STATE:
      return defaultState;
    default:
      return state;
  }
}