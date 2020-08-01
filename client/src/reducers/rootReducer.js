import { combineReducers } from 'redux';
import sessionReducer from './session';
import boardsReducer from './boards';

export default combineReducers({
  session: sessionReducer,
  boards: boardsReducer,
});