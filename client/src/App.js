import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import io from 'socket.io-client';
import socketSetup from './socketSetup';

import { authenticate } from './state/actions/authActions';

import Header from './components/Header';
import Footer from './components/Footer';
import Auth from './components/Auth';
import Home from './components/Home';
import Messenger from './components/Messenger';

let socket = io();

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    socket = socketSetup(socket, dispatch);
    dispatch(authenticate(socket));
  }, [dispatch, socket]);

  const authenticated = useSelector(state => state.auth.authenticated);
  const dialogId = useSelector(state => state.dialog.id);

  const Content = () => {

    if(authenticated) {

      if(dialogId) {
        return <Messenger socket={socket} />
      } else {
        return <Home socket={socket} />;
      }

    } else {

      return <Auth socket={socket} />;

    }

  };

  return (
    <div className="App">
      <Header socket={socket} />
      <Content />
      <Footer />
    </div>
  );

};

export default App;