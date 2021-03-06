import * as type from './MessageActionTypes'
import request from 'superagent'
import {CONSTANTS} from "../../helpers/constants";

const getPortsStart = () => ({
    type: type.GET_PORTS_START

})
const getPortsSuccess = (ports) => ({
    type: type.GET_PORTS_SUCCESS,
    payload: ports,

})
const getPortsError = (err) => ({
    type: type.GET_PORTS_ERROR,
    payload: err,

})

const sendMessageStart = () => ({
    type: type.SEND_MESSAGE_START,

})
const sendMessageSuccess = (message) => ({
    type: type.SEND_MESSAGE_SUCCESS,
    payload: message,

})
const sendMessageError = (err) => ({
    type: type.SEND_MESSAGE_ERROR,
    payload: err,

})


export const getPorts = () => async(dispatch) => {
    dispatch(getPortsStart())
    request.get(`${CONSTANTS.baseUr}/message/ports`).end((err, res) => {
        if (err) dispatch(getPortsError(err))
        if (res.body) {
            dispatch(getPortsSuccess(res.body.ports))
        } else {
            dispatch(getPortsError(err))
        }
    })
}

function toHex(str) {
    var hex = '';
    for(var i=0;i<str.length;i++) {
        hex += ''+str.charCodeAt(i).toString(16);
    }
    return hex;
}

export const sendMessage = (message, port) => async(dispatch) => {
    const portUrl = `${port.service.addresses[0]}:${port.port}`
    const encodedMessage = toHex(message)
    dispatch(sendMessageStart())
    request.post(`${CONSTANTS.baseUr}/message`).send({message: encodedMessage, port: portUrl}).end((err, res) => {
        if (err) dispatch(sendMessageError(err))
        dispatch(sendMessageSuccess(res.body))
    })
}