import { combineReducers } from 'redux';
import authentication from './authentication';
import servers from './servers';
import channels from './channels'
import messages from './messages'
import members  from './members'

const rootReducer = combineReducers({
  authentication,
  servers,
  channels,
  messages,
  members
});

export default rootReducer;
