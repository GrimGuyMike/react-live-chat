import "./index.css";

import { useDispatch, useSelector } from "react-redux";

import { exitDialog } from "../../state/actions/dialogActions";

import Chat from "./Chat"
import MessageForm from "./MessageForm"

const Messenger = ({ socket }) => {

    const dispatch = useDispatch();

    const dialog = useSelector(state => state.dialog);

    const handleClick = () => {
        
        if(!dialog.messages.length) {
            socket.emit('deleteDialog', dialog.id);
        }

        dispatch(exitDialog(dialog.id, socket));

    };

    return (
        <div className="App-content">
            <div className="messenger">
                <div className="chatHeader">
                    <button className='backBtn' onClick={handleClick}>
                        &#8592; Back to dialogs
                    </button>
                    <h2 className="dialogName">{dialog.name}</h2>
                </div>

                <Chat />
                <MessageForm socket={socket} />
            </div>
        </div>
    );

};

export default Messenger;