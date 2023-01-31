import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth/Auth';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
