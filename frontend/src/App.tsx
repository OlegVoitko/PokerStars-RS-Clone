import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import StartPage from './pages/StartPage';
import PlayerRoom from './pages/PlayerRoom';
import TableRoom from './pages/TableRoom';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<StartPage />} />
          <Route path='table' element={<TableRoom />} />
          <Route path='player' element={<PlayerRoom />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
