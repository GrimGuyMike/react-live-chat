import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    AUTH_ERROR,
    USER_LOADING,
    USER_LOADED,
    CLEAR_DIALOG
} from './types';
import headersConfig from './utils/headersConfig';
import { getError, clearError } from './errorActions';

export const register = (name, email, password, socket) => (dispatch, getState) => {

    const user = { name, email, password };
    const body = JSON.stringify(user);
    const headers = headersConfig(getState);

    fetch('/api/users', {
        method: 'POST',
        headers,
        body
    })
    .then(res => {

        if(!res.ok) return res.json().then(data => {
            dispatch(getError(res.status, data.message, REGISTER_FAIL));
            dispatch({ type: REGISTER_FAIL });
        });

        res.json().then(data => {

            const userId = data.user._id.toString();

            socket.emit('signIn', userId);

            dispatch(clearError());
            dispatch({
                type: REGISTER_SUCCESS,
                payload: data
            });

        });

    });

};

export const logIn = (email, password, socket) => (dispatch, getState) => {

    dispatch({ type: USER_LOADING });

    const user = { email, password };
    const body = JSON.stringify(user);
    const headers = headersConfig(getState);

    fetch('/api/auth', {
        method: 'POST',
        headers,
        body
    })
    .then(res => {

        if(!res.ok) return res.json().then(data => {
            dispatch(getError(res.status, data.message, LOGIN_FAIL));
            dispatch({ type: LOGIN_FAIL });
        });

        res.json().then(data => {

            const userId = data.user._id.toString();

            socket.emit('signIn', userId);

            dispatch(clearError());
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data
            });

        });

    });

};

export const authenticate = socket => (dispatch, getState) => {

    dispatch({ type: USER_LOADING });

    const headers = headersConfig(getState);

    fetch('/api/auth/user', {
        method: 'GET',
        headers
    })
    .then(res => {

        if(!res.ok) return res.json().then(data => {
            dispatch(getError(res.status, data.message, AUTH_ERROR));
            dispatch({ type: AUTH_ERROR });
        });

        res.json().then(data => {

            const userId = data._id.toString();

            socket.emit('signIn', userId);

            dispatch(clearError());
            dispatch({
                type: USER_LOADED,
                payload: data
            });

        });

    });
    
};

export const logOut = (userId, socket) => dispatch => {
    socket.emit('logOut', userId);
    dispatch({ type: CLEAR_DIALOG });
    dispatch({ type: LOGOUT_SUCCESS });
};