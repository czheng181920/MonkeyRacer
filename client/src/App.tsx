import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { getMembers } from './actions';
import Header from './components/Header';
import Login from './components/Login';
import Main from './components/Main';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [data, setData] = useState([{}]);

  useEffect(() => {
    getMembers().then((data) => {
      setData(data)
    })
  }, []);

  return (
    <div className="App" id="app">
      <div className=""></div>
      <div id="contentWrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="login" element={<Login/>} />
        </Routes>
        <Footer></Footer>
      </div>
      <div className=""></div>
    </div>
  );
}

export default App;
