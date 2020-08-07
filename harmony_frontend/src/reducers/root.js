import { combineReducers } from 'redux';
import authentication from './authentication';
import servers from './servers';
import channels from './channels'

const rootReducer = combineReducers({
  authentication,
  servers,
  channels,
});

export default rootReducer;
