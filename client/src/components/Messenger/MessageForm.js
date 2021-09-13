import { useState } from "react";
import { useSelector } from "react-redux";

const MessageForm = ({ socket }) => {

    const user = useSelector(state => state.auth.user);
    const dialogId = useSelector(state => state.dialog.id);

    const [messageText, setMessageText] = useState('');

    const onSubmit = e => {
        
        e.preventDefault();

        const message = {
            from: user.name,
            text: messageText,
            date: new Date()
        };

        socket.emit('postMessage', dialogId, message);

        setMessageText('');

    };

    const handleKeyPress = e => {

        if(e.shiftKey && e.key === 'Enter') {

            e.preventDefault();

            const form = e.target.parentElement;
            return form.requestSubmit();
            
        }

    };

    return (
        <form onSubmit={onSubmit}>

            <textarea
                id='messageInput'
                placeholder='Type youre message'
                value={messageText}
                onChange={e => setMessageText(e.target.value)}
                onKeyPress={handleKeyPress}
                autoFocus
                rows='4'
            />

            <input
                id='sendBtn'
                type="submit"
                value='&#9993; Send'
            />

        </form>
    );

};

export default MessageForm;