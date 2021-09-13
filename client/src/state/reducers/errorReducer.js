import {
    GET_ERROR,
    CLEAR_ERROR
} from '../actions/types';

const initialState = {
    status: null,
    message: null,
    id: null
};

const errorReducer = (state=initialState, action) => {

    switch(action.type) {

        default:
            return {...state};

        case GET_ERROR:
            return {
                status: action.payload.status,
                message: action.payload.message,
                id: action.payload.id
            };

        case CLEAR_ERROR:
            return {...initialState};

    }

};

export default errorReducer;