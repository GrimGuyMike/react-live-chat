import {
    GET_ONLINE_USERS,
    FIND_USER,
    USERS_LOADING,
    USERS_UPDATE,
    CLEAR_USER_SEARCH,
    USER_LEFT,
    USER_LOGGED_IN
} from '../actions/types';

const initialState = {
    loading: false,
    online: [],
    search: null
};

const usersReducer = (state=initialState, action) => {

    switch(action.type) {

        default:
            return {...state};

        case USERS_LOADING:
            return {
                ...state,
                loading: true
            };

        case GET_ONLINE_USERS:
        case USERS_UPDATE:
            return {
                ...state,
                loading: false,
                online: action.payload
            };

        case USER_LEFT:
            return {
                ...state,
                online: state.online.filter(user => user._id.toString() !== action.payload)
            }

        case USER_LOGGED_IN:
            return {
                ...state,
                online: [...state.online, action.payload]
            }

        case FIND_USER:
            return {
                ...state,
                search: action.payload
            };

        case CLEAR_USER_SEARCH:
            return {
                ...state,
                search: null
            };

    }

};

export default usersReducer;