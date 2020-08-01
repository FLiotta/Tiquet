import { combineReducers } from 'redux';
import sessionReducer from './session';
import boardsReducer from './boards';
import profileReducer from './profile';

export default combineReducers({
  session: sessionReducer,
  boards: boardsReducer,
  profile: profileReducer,
});