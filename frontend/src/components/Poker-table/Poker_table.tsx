import React, { useEffect, useState } from 'react';
import Chat from '../Chat/Chat';
import './Poker_table.scss';
import CustomizedSlider from './Slider_table';
import Sound from './SoundOnOff';
import SeatBtn from './SeatBtn';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { shuffle, getWinner } from '../../utils/gameHelper';
import { IUser, IGameplay } from '../../types/interfaces';
import {
  checkActionFetch,
  restartDealFetch,
  betActionThunk,
  callActionThunk,
  foldActionThunk,
} from '../../store/gameplaySlice';
import SeatOutBtn from './SeatOutBtn';
import { BLIND_SIZE } from '../../utils/constants';
import '../Cards-style/RenderCards.scss';
import { RenderCards } from 'components/Cards-style';
import { RenderPlayer } from 'components/Cards-style/PlayerCards';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Poker_table = (): JSX.Element => {
  const [isShowSeat, setIsShowSeat] = useState(true);
  const dispatch = useAppDispatch();
  const {
    usersInDeal,
    usersAtTable,
    isDeal,
    waitToSeat,
    currentUser,
    showCards,
    stage,
    currentBet,
    bank,
    userOptions,
  } = useAppSelector((state: { gameplay: IGameplay }) => state.gameplay);
  const user = useAppSelector((state) => state.user.user) as IUser;
  const { _id } = user;

  const [currentValue, setCurrentValue] = useState(BLIND_SIZE);
  const minBet = currentUser ? currentBet - currentUser.gameState.bet + BLIND_SIZE : 0;
  const maxBet = currentUser ? currentUser.gameState.stack : 10000;

  useEffect(() => {
    setCurrentValue(minBet);
    if (
      (!isDeal && waitToSeat.length === 2) ||
      stage === 4 ||
      (stage === 100 && usersAtTable.length > 2) ||
      (waitToSeat.length > 1 && usersAtTable.length === 1)
    ) {
      if (stage === 4) {
        const winners = getWinner(usersInDeal);
        toast.success(`${winners.map((w) => w.nickname).join(' & ')} took the pot`);
      }
      if (stage === 100) {
        toast.success(`${usersAtTable[0].nickname} took the pot`);
      }
      if (waitToSeat.length && user._id === waitToSeat[0]._id) {
        toast(`${waitToSeat.map((u) => u.nickname).join(' & ')} join the game`);
        setTimeout(() => {
          const deck = shuffle();
          dispatch(restartDealFetch({ deck, usersAtTable }));
        }, 3000);
      } else if (usersAtTable.length && user._id === usersAtTable[0]._id) {
        setTimeout(() => {
          const deck = shuffle();
          dispatch(restartDealFetch({ deck, usersAtTable }));
        }, 3000);
      }
    }
  }, [stage, waitToSeat, currentUser]);

  const handleCheck = () => {
    dispatch(checkActionFetch());
  };

  const handleBet = ({ _id, betSize }: { _id: string; betSize: number }) => {
    console.log(betSize);
    dispatch(betActionThunk({ _id, betSize }));
  };

  const handleCall = () => {
    dispatch(callActionThunk({ _id }));
  };

  const handleFold = () => {
    dispatch(foldActionThunk({ _id }));
  };
  const toggleSeatBtn = () => setIsShowSeat(!isShowSeat);

  return (
    <div className='poker-table__wrapper'>
      <div className='poker__background'>
        <div className='poker-table__container gradient-border' id='box'>
          <div className='additional-features'>
            <Sound />
          </div>
          <div className='poker__container'>
            <img
              className='poker-table__table-image'
              src={require('../../assets/poker_table.jpg')}
              alt='poker table'
            />
            <div className='card__container'>
              <RenderCards cards={showCards} />
            </div>
            <div className='bank__container'>
              <img src={require('../../assets/chip-bank.png')} alt='chip bank' />
              <h4>{bank}$</h4>
            </div>
            <div className='players-in-deal'>
              <RenderPlayer users={usersInDeal} />
            </div>
          </div>
          {isShowSeat && (
            <div className='poker-table__seat-btn action__buttons'>
              <SeatBtn toggleSeatBtn={toggleSeatBtn} />
            </div>
          )}
          {!isShowSeat && (
            <div className='poker-table__seat-btn action__buttons'>
              <SeatOutBtn toggleSeatBtn={toggleSeatBtn} />
            </div>
          )}
          <div className='action__bar'>
            {currentUser?._id === _id && (
              <div>
                <div className='action__buttons'>
                  <button className='action__buttons__fold' onClick={handleFold}>
                    Fold
                  </button>
                  {!!currentBet && (
                    <button className='action__buttons__Call' onClick={handleCall}>
                      Call
                    </button>
                  )}
                  {userOptions.includes('check') && (
                    <button className='action__buttons__Call' onClick={handleCheck}>
                      Check
                    </button>
                  )}
                  {currentValue <= currentUser.gameState.stack && (
                    <button
                      className='action__buttons__RaiseTo'
                      onClick={() => handleBet({ _id, betSize: currentValue })}
                    >
                      Raise To
                    </button>
                  )}
                </div>
                <div className='action__bar__slider'>
                  <CustomizedSlider
                    currentValue={currentValue}
                    setCurrentValue={setCurrentValue}
                    minValue={minBet}
                    maxValue={maxBet}
                  />
                </div>
              </div>
            )}
            <section className='tableroom__chat'>
              <Chat />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poker_table;
