import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import StartPage from './Pages/StartPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<StartPage />} />
      </Routes>
    </>
  );
}

export default App;
