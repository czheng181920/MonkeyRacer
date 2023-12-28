import React, { useState, useEffect } from 'react';
import './App.css';
import { TextForm } from './components/TextForm';
import { ConnectionManager } from './components/ConnectionManager';
import { socket } from './socket'


function App() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [text, setText] = useState("");

  useEffect(() => {
    function onConnect() {
      setIsConnected(true)
    }

    function onDisconnect() {
      setIsConnected(false)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
    }
  }, []);

  return (
    <>
      <TextForm />
      <ConnectionManager />
    </>
  );
}

export default App;
