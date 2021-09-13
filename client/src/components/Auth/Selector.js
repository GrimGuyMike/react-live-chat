import { useState } from "react";
import { useDispatch } from "react-redux";

import { clearError } from "../../state/actions/errorActions";

import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import Error from "./Error";

const Selector = ({ socket }) => {

    const dispatch = useDispatch();
    const [signUp, setSignUp] = useState(false);

    const Form = () => {

        if(signUp)
            return (
                <div className="form">
                    <Error />
                    <SignUpForm socket={socket} />
                </div>
            );
        else
            return (
                <div className="form">
                    <Error />
                    <SignInForm socket={socket} />
                </div>
            );

    };

    const chooseOption = doSignUp => {
        if(signUp !== doSignUp) {
            dispatch(clearError());
            setSignUp(doSignUp);
        }
    };

    return (
        <div className='selector'>

            <div className="tabs">
                <span
                    className={`option ${!signUp && 'active'}`}
                    onClick={() => chooseOption(false)}
                >Sign in</span>

                <span
                    className={`option ${signUp && 'active'}`}
                    onClick={() => chooseOption(true)}
                >Sign up</span>
            </div>

            <Form />

        </div>
    );

};

export default Selector;