import { combineReducers } from 'redux';
import authentication from './authentication';
import servers from './servers';

const rootReducer = combineReducers({
  authentication,
  servers,
});

export default rootReducer;
