import Searchbar from "./Searchbar"
import Users from "./Users"

const Sidebar = ({ socket }) => {

    return (
        <div className='sidebar'>
            <Searchbar socket={socket} />
            <Users socket={socket} />
        </div>
    );

};

export default Sidebar;