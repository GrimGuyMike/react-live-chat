import {
    CREATE_DIALOG,
    ENTER_DIALOG,
    EXIT_DIALOG,
    DIALOG_LOADING,
    NEW_MESSAGE,
    CLEAR_DIALOG
} from '../actions/types';

const initialState = {
    id: null,
    name: null,
    users: [],
    messages: [],
    loading: false
};

const dialogReducer = (state=initialState, action) => {

    switch(action.type) {

        default:
            return {...state};

        case DIALOG_LOADING:
            return {
                ...state,
                loading: true
            };

        case CREATE_DIALOG:
        case ENTER_DIALOG:
            return {
                ...action.payload,
                loading: false,
                id: action.payload._id.toString()
            };

        case NEW_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, action.payload]
            };

        case EXIT_DIALOG:
        case CLEAR_DIALOG:
            return {...initialState};

    }

};

export default dialogReducer;