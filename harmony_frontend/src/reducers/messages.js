import {
    ADD_MESSAGE,
    CLEAR_MESSAGES
} from '../actions/ServerActions'

const messagesReducer = (state=[], action) => {
    switch (action.type) {
        case ADD_MESSAGE: {
            return [
                ...state,
                {
                    message: action.message
                }
            ]
        }
        case CLEAR_MESSAGES: {
            return [];
        }

        default: return state;
    }

}

export default messagesReducer;
