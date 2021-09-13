import { useSelector } from 'react-redux';

import {
    LOGIN_FAIL,
    REGISTER_FAIL
} from '../../state/actions/types';

const Error = () => {
    
    const error = useSelector(state => state.error);

    if( error.id === LOGIN_FAIL || error.id === REGISTER_FAIL )
        return (
            <div className='error'>
                {error.message}
            </div>
        );
    else
        return null;

};

export default Error;