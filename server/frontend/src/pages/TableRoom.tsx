import React from 'react';
import Table_poker from '../components/Poker-table/Poker_table';
import './TableRoom.scss';

const TableRoom = (): JSX.Element => {
  return (
    <>
      <section className='tableroom__table'>
        <Table_poker />
      </section>
    </>
  );
};

export default TableRoom;
