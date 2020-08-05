import {
  SET_TOKEN,
  REMOVE_TOKEN,
  SET_USER,
} from '../actions/authentication';

const authReducer = (state = {}, action) => {
  let nextState= {...state}
  switch (action.type) {
    case SET_TOKEN: {
      nextState= {...nextState, ...action.token}
      return nextState;
    }

    case SET_USER: {
      nextState= {...nextState, ...action.user}
      return nextState;
    }

    case REMOVE_TOKEN: {
      delete nextState.token;
      return nextState;
    }

    default: return state;
  }
}

export default authReducer;
