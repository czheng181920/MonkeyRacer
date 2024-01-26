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

function App() {
  const [passage, setPassage] = useState("");

  useEffect(() => {
    socket.on('setup_game', (words) => {
      setPassage(words.join(" "));
    });

    socket.on('incorrect_input', (data) => {
      console.log(data)
    });

    socket.on('correct_input', () => {
      
    });
  }, []);

  return (
    <div className="App" id="app">
      <div className=""></div>
      <div id="contentWrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="login" element={<Login/>} />
          <Route path="join" element={<JoinGame />} />
        </Routes>
        <Footer></Footer>
      </div>
      <div className=""></div>
    </div>

      
  );
}

export default App;
