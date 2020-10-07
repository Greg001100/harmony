import {
    ADD_CHANNEL,
    CLEAR_CHANNELS
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
        case CLEAR_CHANNELS: {
            return [];
        }

        default: return state;
    }

}

export default channelsReducer;
