import {
    ADD_SERVER
} from '../actions/ServerActions'

const serversReducer = (state=[], action) => {
    switch (action.type) {
        case ADD_SERVER: {
            return [
                ...state,
                {
                    server: action.server
                }
            ]
        }

        default: return state;
    }

}

export default serversReducer;
