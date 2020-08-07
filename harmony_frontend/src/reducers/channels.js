import {
    ADD_CHANNEL,
} from '../actions/ServerActions'

const channelsReducer = (state=[], action) => {
    switch (action.type) {
        case ADD_CHANNEL: {
            return [
                ...state,
                {
                    channel: action.channel
                }
            ]
        }

        default: return state;
    }

}

export default channelsReducer;
