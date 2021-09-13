import { CREATE_DIALOG, NEW_MESSAGE, USER_LEFT, USER_LOGGED_IN, USER_NEW_DIALOG, USER_UPDATE } from './state/actions/types';

export default (socket, dispatch) => {

    socket.on('dialogCreated', dialog => dispatch({
        type: CREATE_DIALOG,
        payload: dialog
    }));

    socket.on('newDialog', dialog => dispatch({
        type: USER_NEW_DIALOG,
        payload: dialog
    }));

    socket.on('dialogDeleted', user => dispatch({
        type: USER_UPDATE,
        payload: user
    }));

    socket.on('newMessage', message => dispatch({
        type: NEW_MESSAGE,
        payload: message
    }));

    socket.on('userLeft', userId => dispatch({
        type: USER_LEFT,
        payload: userId
    }));

    socket.on('userLoggedIn', user => dispatch({
        type: USER_LOGGED_IN,
        payload: user
    }));

    return socket;

};