import { useState } from "react";
import { useDispatch } from 'react-redux';
import { logIn } from '../../state/actions/authActions';

const SignInForm = ({ socket }) => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = e => {
        e.preventDefault();

        dispatch(logIn(email, password, socket));
    };

    return (
        <form className='authForm' onSubmit={onSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name='email'
                    placeholder='Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name='password'
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            <input
                type="submit"
                value='Sign In'
            />
        </form>
    );
    
};

export default SignInForm;