import {
  SET_TOKEN,
  REMOVE_AUTH,
  SET_USER,
  BAD_CREDENTIALS,
  VAL_ERRORS
} from '../actions/authentication';

const authReducer = (state = {}, action) => {
  let nextState= {...state}
  switch (action.type) {
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
      };
    }

    case SET_USER: {
      nextState= {...nextState, ...action.user}
      return nextState;
    }

    case REMOVE_AUTH: {
      nextState = {};
      return nextState;
    }

    case BAD_CREDENTIALS: {
      nextState = {...nextState, badCredentials: action.badCredentials}
      return nextState;
    }

    case VAL_ERRORS: {
      nextState = {...nextState, valErrors: action.valErrors}
      return nextState;
    }

    default: return state;
  }
}

export default authReducer;
