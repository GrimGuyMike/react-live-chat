import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import { getOnlineUsers } from '../../state/actions/usersActions';
import { enterDialog } from "../../state/actions/dialogActions";

const Users = ({ socket }) => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOnlineUsers());
    }, [dispatch]);

    const user = useSelector(state => state.auth.user);
    const users = useSelector(state => state.users);

    const { loading } = users;
    const online = users.online.map((userOnline, idx) => (
        <div
            key={idx}
            className='user'
            onClick={() => handleUserClick(userOnline)}
        >
            {userOnline.name}
        </div>
    ));

    const handleUserClick = userOnline => {

        const userOnlineId = userOnline._id.toString();
        const existingDialogsUsersIds = user.dialogs.map(dialog => dialog.interlocutorId);
        const index = existingDialogsUsersIds.findIndex(id => id === userOnlineId);

        if(index !== -1) {

            const dialog = user.dialogs[index];

            dispatch(enterDialog(dialog.id, dialog.name, socket));

        } else {

            const dialog = {
                users: [
                    user._id.toString(),
                    userOnline._id.toString()
                ],
                messages: []
            };
    
            socket.emit('createDialog', user.name, userOnline.name, dialog);

        }

    };

    if(loading) {

        return (
            <>
                <h4 className='onlineHeader'>Currently online:</h4>
                <div className="usersScroll">
                    <h4>Loading...</h4>
                </div>
            </>
        );

    } else {

        return (
            <>
                <h4 className='onlineHeader'>Currently online:</h4>
                <div className="usersScroll">
                    {
                        online.length ?
                        online :
                        <h4>No users online</h4>
                    }
                </div>
            </>
        );

    }

};

export default Users;