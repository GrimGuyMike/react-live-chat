import { combineReducers } from "redux";
import authReducer from './authReducer';
import dialogReducer from './dialogReducer';
import usersReducer from './usersReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    auth: authReducer,
    dialog: dialogReducer,
    users: usersReducer,
    error: errorReducer
});