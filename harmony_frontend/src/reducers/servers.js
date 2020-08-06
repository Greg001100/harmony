import {
    ADD_SERVER
} from '../actions/ServerActions'

const serversReducer = (state={}, action) => {
    let nextState = {...state}
    switch (action.type) {
        case ADD_SERVER: {
            nextState= {...nextState, id: action.id, name: action.name}
        }

        default: return state;
    }

}

export default serversReducer;
