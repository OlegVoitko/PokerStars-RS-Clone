import React from 'react';
import './Poker_table.scss';
import CustomizedSlider from './Slider_table';
import Sound from './SoundOnOff';
import SeatBtn from './SeatBtn';
import { IDeck, shuffle } from '../Cards/Card';
import { useAppSelector } from '../../hooks/hook';

const Poker_table = (): JSX.Element => {
  const gameplay = useAppSelector((state) => state.gameplay);
  const deck: IDeck[] = shuffle();
  const board = deck.slice(0, 5);
  console.log(board);

  return (
    <div className='poker-table__wrapper'>
      <div className='poker__background'>
        <div className='poker-table__container'>
          <div className='additional-features'>
            <Sound />
          </div>
          <img
            className='poker-table__table-image'
            src={require('../../assets/poker_table.jpg')}
            alt='poker table'
          />
          <div className='card__container'></div>
          <div className='bank__container'>
            <img src={require('../../assets/chip-bank.png')} alt='chip bank' />
            <h4>12345</h4>
          </div>
          <div className='poker-table__seat-btn action__buttons'>
            <SeatBtn />
          </div>
          <div className='action__bar'>
            <div className='action__buttons'>
              <button className='action__buttons__fold'>Fold</button>
              <button className='action__buttons__Call'>Call</button>
              <button className='action__buttons__RaiseTo'>Raise To</button>
            </div>
            <div className='action__bar__slider'>
              <CustomizedSlider />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poker_table;
