import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import StartPage from './pages/StartPage';
import PlayerRoom from './pages/PlayerRoom';
import TableRoom from './pages/TableRoom';
import Table_poker from './components/Poker-table/Poker_table';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<StartPage />} />
          <Route path='table' element={<Table_poker />} />
          <Route path='player' element={<PlayerRoom />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
