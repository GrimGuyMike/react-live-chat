import { useSelector, useDispatch } from "react-redux";
import { logOut } from '../state/actions/authActions';

const Header = ({ socket }) => {

    const dispatch = useDispatch();

    const authenticated = useSelector(state => state.auth.authenticated);
    const user = useSelector(state => state.auth.user);

    const copyId = () => {
        const ta = document.createElement('textarea');
        document.body.appendChild(ta);
        ta.value = user._id.toString();
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
    };

    const Profile = () => {

        if(authenticated) return (
            <div className="profileDiv">
                <span>{user.name}</span>

                <button onClick={copyId}>
                    Copy ID
                </button>

                <button onClick={() => dispatch(logOut(user._id.toString(), socket))}>
                    Log out
                </button>
            </div>
        );

        return null;

    };
    
    return (
        <header>
            <div className="logo">
                ReactLiveChat
            </div>

            <Profile />
        </header>
    );

};

export default Header;