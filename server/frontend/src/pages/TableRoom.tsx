import React from 'react';
import Table_poker from '../components/Poker-table/Poker_table';
import './TableRoom.scss';
import { useAppSelector } from '../hooks/hook';

const TableRoom = (): JSX.Element => {
  const { player } = useAppSelector((state) => state.player);
  console.log('tableRoom player', player);

  return (
    <>
      <section className='tableroom__table'>
        <Table_poker />
      </section>
    </>
  );
};

export default TableRoom;
