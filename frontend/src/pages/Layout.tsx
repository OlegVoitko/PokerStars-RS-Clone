import React from 'react';
import { Outlet } from 'react-router-dom';
// import './Layout.scss';
import Header from '../components/Header/Header';

const Layout = (): JSX.Element => {
  return (
    <>
      <Header />

      <Outlet />
    </>
  );
};

export default Layout;
