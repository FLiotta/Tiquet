import { IBoard } from '../interfaces/Board';
import { IPriority } from '../interfaces/Priority';
import { ITask } from '../interfaces/Task';

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
  SET_LISTS,
  ORDER_TASKS,
} from '../actions/board';

export interface IBoardReducer extends IBoard { };

const defaultState: IBoardReducer = {
  id: undefined,
  title: '',
  lists: [],
  priorities: [],
}

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
    case ORDER_TASKS:
      return {
        ...state,
        lists: state.lists.map(list => ({
          ...list,
          tasks: list.id == action.payload.listId ? action.payload.tasks : list.tasks
        }))
      }
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
      const new_priority: IPriority = state.priorities.find((priority: IPriority) => priority.id == action.payload.priorityId);

      return {
        ...state,
        lists: state.lists.map(list => ({
          ...list,
          tasks: list.tasks.map(task => task.id === action.payload.taskId
            ? { ...task, priority: new_priority.value }
            : task)
        }))
      };
    case UPDATE_TASK_TITLE:
      return {
        ...state,
        lists: state.lists.map(list => ({
          ...list,
          tasks: list.tasks.map(task => task.id === action.payload.taskId
            ? { ...task, title: action.payload.title }
            : task)
        }))
      };
    case MOVE_TASK:
      const task: ITask = state.lists
        .flatMap(list => list.tasks)
        .find(task => task.id == action.payload.taskId);

      return {
        ...state,
        lists: state.lists.map(list => {
          const parsed_list = list;

          if (list.id === action.payload.originListId) {
            parsed_list.tasks = parsed_list.tasks.filter(i_task => i_task.id !== action.payload.taskId);
          } else if (list.id === action.payload.destinyListId) {
            parsed_list.tasks = [...parsed_list.tasks, task];
          }

          return parsed_list;
        }),
      };
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, action.payload]
      };
    case ADD_TASK:
      return {
        ...state,
        lists: state.lists.map(list => list.id === action.payload.listId
          ? {
            ...list,
            tasks: [...list.tasks, action.payload.newTask]
          }
          : list)
      };
    case DELETE_TASK:
      return {
        ...state,
        lists: state.lists.map(list => ({
          ...list,
          tasks: list.tasks.filter(task => task.id !== action.payload.taskId)
        })),
      };
    case SET_LISTS:
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