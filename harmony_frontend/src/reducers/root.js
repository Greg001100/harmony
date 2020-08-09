import { combineReducers } from 'redux';
import authentication from './authentication';
import servers from './servers';
import channels from './channels'
import messages from './messages'

const rootReducer = combineReducers({
  authentication,
  servers,
  channels,
  messages
});

export default rootReducer;
