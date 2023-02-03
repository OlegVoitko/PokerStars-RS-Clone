import React from 'react';
import Chat from '../components/Chat/Chat';
import Table_poker from '../components/Poker-table/Poker_table';
import './TableRoom.scss';

const TableRoom = (): JSX.Element => {
  return (
    <>
      <h1>TableRoom</h1>
      <section className='tableroom__table'>
        <Table_poker />
      </section>
      <section className='tableroom__chat'>
        <Chat />
      </section>
    </>
  );
};

export default TableRoom;
