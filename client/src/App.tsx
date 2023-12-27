import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getMembers } from './actions';

function App() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    getMembers().then((data) => {
      setData(data)
      console.log(data)
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
