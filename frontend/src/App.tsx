import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Table_poker from './components/Poker-table/Poker_table';

function App() {
  return (
    <>
      <Routes>
        <Route path='' element={<Table_poker />}></Route>
      </Routes>
    </>
  );
}

export default App;
