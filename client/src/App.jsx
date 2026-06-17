import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import InputBar from './InputBar/InputBar';
import Home from './HomePage/home';

function App() {

  return (
    <Routes>
      <Route path='' element={<Home/>}/>
      <Route path='/chat' element={<InputBar/>}/>
    </Routes>
  );
}

export default App
