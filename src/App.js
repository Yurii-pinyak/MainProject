import './App.css';
import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from './Components/Home';
import Login from "./Components/Login"
import Register from './Components/Register';
import Shop from './Components/Shop';
import Tasks from './Components/Tasks';

export default function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='Login' element={<Login/>}/>
        <Route path='Register' element={<Register/>}/>
        <Route path='Shop' element={<Shop/>}/>
        <Route path='Tasks' element={<Tasks/>}/>
      </Routes>
      </div>
  );
};