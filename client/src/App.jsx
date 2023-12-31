import React, { useState, useEffect } from 'react';
import './App.css';
import TextForm from './components/TextForm';
import { ConnectionManager } from './components/ConnectionManager';
import { socket } from './socket'


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
    <>

      <ConnectionManager />
      <div className='temp'>
        <br />
        {passage}
        <TextForm passage={passage} />
      </div>
    </>
  );
}

export default App;
