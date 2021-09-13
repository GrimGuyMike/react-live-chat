import "./index.css";
import Selector from "./Selector";

const Auth = ({ socket }) => {
    
    return (
        <div className='App-content'>
            <Selector socket={socket} />
        </div>
    );

};

export default Auth;