import {
    GET_ERROR,
    CLEAR_ERROR
} from './types';

export const getError = (status, message, id) => dispatch => {

    const error = {
        status,
        message,
        id
    };

    dispatch({
        type: GET_ERROR,
        payload: error
    });

};

export const clearError = () => ({ type: CLEAR_ERROR });