import React from 'react';
import Table_poker from '../components/Poker-table/Poker_table';
import './TableRoom.scss';
import { useAppSelector } from '../hooks/hook';

const TableRoom = (): JSX.Element => {
  // const { user } = useAppSelector((state) => state.user);
  // console.log('tableRoom ', user);
  return (
    <>
      <section className='tableroom__table'>
        <Table_poker />
      </section>
    </>
  );
};

export default TableRoom;
