import React from 'react';
import './App.css';
import {Routes, Route} from "react-router-dom"
import Main from './pages/main/main';
import Login from './pages/login';
import Navbar from './components/navbar';
import CreatePost from './pages/create-post/create-post';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase';

function App() {
  const [user] = useAuthState(auth)
  return (
    <div className="App">
      <Navbar/>
      
      <Routes>
        {user && <Route path='/' element={<Main/>}/>}
        <Route path='login' element={<Login/>}/>
        <Route path='createpost' element={<CreatePost/>}/>
      </Routes>
    </div>
  );
}

export default App;
