import {
    ENTER_DIALOG,
    EXIT_DIALOG,
    DIALOG_LOADING
} from './types';
import { clearUserSearch } from './usersActions';
import headersConfig from './utils/headersConfig';

export const enterDialog = (id, name, socket) => (dispatch, getState) => {

    dispatch({ type: DIALOG_LOADING });

    const headers = headersConfig(getState);

    fetch(`/api/dialogs/${id}`, {
        method: 'GET',
        headers
    })
    .then(res => res.json())
    .then(data => {
        
        dispatch(clearUserSearch());

        dispatch({
            type: ENTER_DIALOG,
            payload: {
                ...data,
                name
            }
        });

        socket.emit('enterDialog', id);

    });

};

export const exitDialog = (dialogId, socket) => {    
    socket.emit('exitDialog', dialogId);
    return { type: EXIT_DIALOG };
};