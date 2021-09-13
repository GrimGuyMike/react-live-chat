import moment from 'moment';
import { useEffect } from 'react';

import { useSelector } from "react-redux";

const Chat = () => {

    const user = useSelector(state => state.auth.user);
    let anchor;

    const formatDate = date => {

        const dateFormatTemplate = 'DD.MM.YYYY';
        const timeFormatTemplate = 'hh:mm A';
        const fullFormatTemplate = `${timeFormatTemplate} ${dateFormatTemplate}`;

        const dateString = moment(date).format(dateFormatTemplate);
        const todayString = moment(Date()).format(dateFormatTemplate);

        if(dateString !== todayString) {
            return moment(date).format(fullFormatTemplate);
        }

        return moment(date).format(timeFormatTemplate);

    };

    const markOwnMessage = name => {
        if(name === user.name) return 'own';
        return '';
    };

    const scrollToBottom = () => {
        anchor.scrollIntoView({ behavior: 'smooth' });
    };

    const dialog = useSelector(state => state.dialog);
    const messages = dialog.messages.map((message, idx) => (
        <div
            key={idx}
            className={`message ${markOwnMessage(message.from)}`}
        >
            <p>{message.text}</p>
            <div className="meta">
                <span className='from'>{message.from}</span>
                <span className='date'>{formatDate(message.date)}</span>
            </div>
        </div>
    ));

    useEffect(() => {
        scrollToBottom();
    }, [dialog]);

    return (
        <div className="chat">
            {messages}
            <div className="anchor" ref={el => anchor = el}></div>
        </div>
    );

};

export default Chat;