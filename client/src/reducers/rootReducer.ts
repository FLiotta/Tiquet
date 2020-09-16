import { combineReducers } from 'redux';
import sessionReducer, { ISessionReducer } from './session';
import boardsReducer, { IBoardsReducer } from './boards';
import boardReducer, { IBoardReducer } from './board';
import taskDescription, { ITaskDescriptionReducer } from './taskDescription';

export interface IRootReducer {
  session: ISessionReducer,
  board: IBoardReducer,
  taskDescription: ITaskDescriptionReducer,
  boards: IBoardsReducer,
}

const rootReducer = combineReducers<IRootReducer>({
  session: sessionReducer,
  boards: boardsReducer,
  board: boardReducer,
  taskDescription: taskDescription,
});

export default rootReducer;