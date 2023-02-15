import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import StartPage from './pages/StartPage';
import PlayerRoom from './pages/PlayerRoom';
import TableRoom from './pages/TableRoom';
import Auth from './components/Auth/Auth';
import Header from './components/Header/Header';
import EnterChoice from './components/EnterChoice/EnterChoice';
import Login from './components/Login/Login';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<StartPage />}>
          <Route index element={<EnterChoice />} />
          <Route path='register' element={<Auth />} />
          <Route path='login' element={<Login />} />
        </Route>
        <Route path='table' element={<TableRoom />} />
        <Route path='player' element={<PlayerRoom />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
