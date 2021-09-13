import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    AUTH_ERROR,
    USER_LOADING,
    USER_LOADED,
    USER_UPDATE,
    USER_NEW_DIALOG
} from '../actions/types';

const initialState = {
    loading: false,
    authenticated: false,
    user: null,
    token: localStorage.getItem('token')
};

const authReducer = (state=initialState, action) => {

    switch(action.type) {

        default:
            return {...state};

        case USER_LOADING:
            return {
                ...state,
                loading: true
            };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS: {

            const token = action.payload.token;

            localStorage.setItem('token', token);

            return {
                loading: false,
                authenticated: true,
                user: action.payload.user,
                token
            };

        }

        case USER_LOADED:
            return {
                ...state,
                loading: false,
                authenticated: true,
                user: action.payload
            };

        case USER_UPDATE:
            return {
                ...state,
                user: {...action.payload}
            };

        case USER_NEW_DIALOG:
            return {
                ...state,
                user: {
                    ...state.user,
                    dialogs: [...state.user.dialogs, action.payload]
                }
            };

        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:{

            localStorage.removeItem('token');

            return {
                ...initialState,
                token: null
            };

        }

    }

};

export default authReducer;