import React, { useState, useEffect } from 'react';
import './App.css';
import TextForm from './components/TextForm';
import { ConnectionManager } from './components/ConnectionManager';
import { socket } from './socket'
import Header from './components/Header';
import Login from './components/Login';
import Main from './components/Main';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';
import JoinGame from './components/JoinGame';
import CreateGame from './components/CreateGame';

// Create a context
export const ConnectionContext = React.createContext();

function App() {
  const [passage, setPassage] = useState("");
  const [room, setRoom] = useState("");
  const [roomInput, setRoomInput] = useState("");

  useEffect(() => {
    socket.on('setup_game', (words) => {
      setPassage(words.join(" "));
    });

    socket.on('incorrect_input', (data) => {
      console.log(data)
    });

    socket.on('correct_input', () => {
      
    });

    return () => {
      socket.off('setup_game');
      socket.off('incorrect_input');
      socket.off('correct_input');
    }
  }, []);

  //separate useEffect so that we can isolate the functions that depend on roomInput
  useEffect(() => {
    socket.on('valid_room', () => {
      setRoom(roomInput);
      socket.emit('join', {
        room: roomInput,
        username: "user"
      });
    });

    socket.on('invalid_room', () => {
      setRoom(roomInput);
      socket.emit('create_room', {
        room: roomInput
      });
    });
    return () => {
      socket.off('valid_room');
      socket.off('invalid_room');
    }
  },[roomInput]);
  
  

  return (
    <ConnectionContext.Provider value={{ room, setRoom, roomInput, setRoomInput }}>
      <div className="App" id="app">
        <div className=""></div>
        <div id="contentWrapper">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="login" element={<Login/>} />
            <Route path="join" element={<JoinGame />} />
            <Route path="create" element={<CreateGame />} />
          </Routes>
          <Footer></Footer>
        </div>
        <div className=""></div>
      </div>
    </ConnectionContext.Provider>
      
  );
}

export default App;
