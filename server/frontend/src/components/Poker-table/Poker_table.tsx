import React, { useEffect } from 'react';
import Chat from '../Chat/Chat';
import './Poker_table.scss';
import CustomizedSlider from './Slider_table';
import Sound from './SoundOnOff';
import SeatBtn from './SeatBtn';
import { useAppSelector } from '../../hooks/hook';
import { IPlayer } from './gameLogic/gameLogic';
import { useUpdateGameplayMutation } from '../../services/gameplayApi';
import { IGamePlay } from '../../store/gameplaySlice';

const Poker_table = (): JSX.Element => {
  const gameplay: IGamePlay = useAppSelector((state: { gameplay: IGamePlay }) => state.gameplay);
  const { playersInDeal, isDeal, wait, board } = gameplay;
  const [updateGameplay] = useUpdateGameplayMutation();

  console.log(board);
  console.log(playersInDeal);

  const renderPlayer = (players: IPlayer[]) =>
    players.map((p, i) => (
      <div className='player' key={i}>
        Stack: {p.stack}
        hand: {`${p.hand[0].cardFace}${p.hand[0].suit} ${p.hand[1].cardFace}${p.hand[1].suit}`}
      </div>
    ));

  useEffect(() => {
    updateGameplay(gameplay);
  }, [playersInDeal, isDeal]);

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
            <section className='tableroom__chat'>
              <Chat />
            </section>
          </div>
          <div className='players-in-deal'>{renderPlayer(playersInDeal)}</div>
        </div>
      </div>
    </div>
  );
};

export default Poker_table;
