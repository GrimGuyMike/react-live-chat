import { useState } from "react";
import { useDispatch } from 'react-redux';
import { register } from '../../state/actions/authActions';

const SignUpForm = ({ socket }) => {

    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = e => {
        e.preventDefault();

        dispatch(register(name, email, password, socket));
    };

    return (
        <form className='authForm' onSubmit={onSubmit}>
            <div>
                <label htmlFor="name">User name:</label>
                <input
                    type="text"
                    name='name'
                    placeholder='User name'
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>

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
                value='Sign Up'
            />
        </form>
    );

};

export default SignUpForm;