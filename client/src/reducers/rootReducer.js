import { combineReducers } from 'redux';
import sessionReducer from './session';

export default combineReducers({
  session: sessionReducer,
});