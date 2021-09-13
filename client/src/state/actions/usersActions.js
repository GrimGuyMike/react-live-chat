import {
    GET_ONLINE_USERS,
    FIND_USER,
    USERS_LOADING,
    USERS_UPDATE,
    CLEAR_USER_SEARCH,
    USER_NOT_FOUND
} from './types';
import headersConfig from './utils/headersConfig';
import { getError } from '../actions/errorActions';

export const getOnlineUsers = () => (dispatch, getState) => {

    dispatch({ type: USERS_LOADING });

    const headers = headersConfig(getState);

    fetch('/api/users', {
        method: 'GET',
        headers
    })
    .then(res => res.json())
    .then(data => dispatch({
        type: GET_ONLINE_USERS,
        payload: data
    }));

};

export const findUser = id => (dispatch, getState) => {

    const headers = headersConfig(getState);

    fetch(`/api/users/${id}`, {
        method: 'GET',
        headers
    })
    .then(res => {

        if(!res.ok) return res.json().then(data => {
            dispatch(getError(res.status, data.message, USER_NOT_FOUND));
        });

        res.json().then(data => dispatch({
            type: FIND_USER,
            payload: data
        }));

    });

};

export const updateUsers = users => dispatch => {

    dispatch({ type: USERS_LOADING });

    return {
        type: USERS_UPDATE,
        payload: users
    };

};

export const clearUserSearch = () => dispatch => {
    dispatch({ type: CLEAR_USER_SEARCH });
};