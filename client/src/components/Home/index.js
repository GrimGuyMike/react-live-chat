import "./index.css";
import Sidebar from "./Sidebar";
import Dialogs from "./Dialogs";

const Home = ({ socket }) => {
    
    return (
        <div className='App-content'>
            <div className="dialogsContent">
                <Sidebar socket={socket} />
                <Dialogs socket={socket} />
            </div>
        </div>
    );

};

export default Home;