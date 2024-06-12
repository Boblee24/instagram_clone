import React from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom"
import Main from './pages/main';
import Login from './pages/login';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
