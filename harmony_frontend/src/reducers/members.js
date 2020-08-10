import {
    ADD_MEMBERS,
} from '../actions/ServerActions'

const membersReducer = (state=[], action) => {
    switch (action.type) {
        case ADD_MEMBERS: {
            return [
                ...state,
                {
                    members: action.members
                }
            ]
        }
        // case CLEAR_MEMBERS: {
        //     return [];
        // }

        default: return state;
    }

}

export default membersReducer;
