import { combineReducers } from 'redux';
import sessionReducer from './session';
import boardsReducer from './boards';
import boardReducer from './board';
import profileReducer from './profile';

export default combineReducers({
  session: sessionReducer,
  boards: boardsReducer,
  board: boardReducer,
  profile: profileReducer,
});