import * as type from './MessageActionTypes'

const InitialState = {
    ports: [
    ],
    loading: false,
    err: null,
    messageSent: false
}


export default MessageReducer = (state = InitialState, action) => {
    switch (action.type) {
        case type.GET_PORTS_START:
            return {
                ...state,
                loading: true,
                err: null,
                messageSent: false
            }
        case type.GET_PORTS_SUCCESS:
            return {
                ...state,
                loading: false,
                ports: action.payload,
                err: null,
                messageSent: false
            }
        case type.GET_PORTS_ERROR:
            return  {
                ...state,
                loading: false,
                err: action.payload,
                messageSent: false
            }
        case type.SEND_MESSAGE_START:
            return {
                ...state,
                loading: true,
                err: null,
                messageSent: false
            }
        case type.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                err: null,
                messageSent: true
            }
        case type.SEND_MESSAGE_ERROR:
            return {
                ...state,
                loading: false,
                err: action.payload,
                messageSent: false
            }
    }
    return state
}