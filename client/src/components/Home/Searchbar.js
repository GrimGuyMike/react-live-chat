import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserSearch, findUser } from '../../state/actions/usersActions';

import { USER_NOT_FOUND } from '../../state/actions/types';
import { clearError } from '../../state/actions/errorActions';
import { enterDialog } from '../../state/actions/dialogActions';

const Searchbar = ({ socket }) => {
    
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    const user = useSelector(state => state.auth.user);
    const userSearch = useSelector(state => state.users.search);
    const error = useSelector(state => state.error);

    const onChange = e => {
        const value = e.target.value;

        if(value === '') {
            setSearch(value);
            dispatch(clearUserSearch());
            return dispatch(clearError());
        }

        setSearch(value);
        dispatch(findUser(value));
    };

    const handleUserClick = () => {

        const userSearchId = userSearch._id.toString();
        const existingDialogsUsersIds = user.dialogs.map(dialog => dialog.interlocutorId);
        const index = existingDialogsUsersIds.findIndex(id => id === userSearchId);

        if(index !== -1) {

            const dialog = user.dialogs[index];

            dispatch(enterDialog(dialog.id, dialog.name, socket));

        } else {

            const dialog = {
                users: [
                    user._id.toString(),
                    userSearch._id.toString()
                ],
                messages: []
            };
    
            socket.emit('createDialog', user.name, userSearch.name, dialog);

        }

    };

    const Message = () => {
        
        if(error.id === USER_NOT_FOUND) {
            
            return (
                <div className="searchMessage">User not found</div>
            );

        }

        return (
            <div className="searchMessage">
                Paste user ID above
            </div>
        )

    };

    return (
        <div className="searchbar">
            <input
                type="text"
                placeholder='Find user by ID'
                value={search}
                onChange={onChange}
            />
            <div className="result">
                {
                    userSearch ?
                    <div className="user" onClick={handleUserClick}>{userSearch.name}</div> :
                    <Message />
                }
            </div>
        </div>
    );

};

export default Searchbar;