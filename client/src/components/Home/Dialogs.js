import { useSelector, useDispatch } from "react-redux";
import { enterDialog } from '../../state/actions/dialogActions';

const Dialogs = ({ socket }) => {

    const dispatch = useDispatch();

    const dialogs = useSelector(state => state.auth.user.dialogs)
    .map((dialog, idx) => (
        <div
            key={idx}
            className="dialog"
            onClick={() => dispatch(enterDialog(dialog.id, dialog.name, socket))}
        >
            <strong>{dialog.name}</strong>
        </div>
    ));

    if(dialogs.length) {
     
        return (
            <div className='dialogs'>
                {dialogs}
            </div>
        );

    }

    return (
        <div className="dialogs">
            <h3>No dialogs yet</h3>
        </div>
    );

};

export default Dialogs;