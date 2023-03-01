import React, { useEffect, useRef, useState } from 'react';
import Chat from '../Chat/Chat';
import './Poker_table.scss';
import CustomizedSlider from './Slider_table';
import SeatBtn from './SeatBtn';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { shuffle } from '../../utils/gameHelper';
import { IUser, IGameplay } from '../../types/interfaces';
import {
  checkActionFetch,
  restartDealFetch,
  betActionThunk,
  callActionThunk,
  foldActionThunk,
} from '../../store/gameplaySlice';
import SeatOutBtn from './SeatOutBtn';
import { BLIND_SIZE, TIMER } from '../../utils/constants';
import '../Player/RenderCards.scss';
import { RenderCards } from 'components/Player';
import { RenderPlayer } from 'components/Player/RenderPlayer';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SoundOnOff from './SoundOnOff';
import { connectSocket, socket } from 'socket';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

const Poker_table = (): JSX.Element => {
  // const [isShowSeat, setIsShowSeat] = useState(true);
  const [timer, setTimer] = useState(TIMER);
  const timerRef = useRef(TIMER);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const {
    indexOfSB,
    usersInDeal,
    usersCount,
    usersAllin,
    usersAtTable,
    isDeal,
    waitToSeat,
    currentUser,
    showCards,
    stage,
    currentBet,
    bank,
    userOptions,
    winners,
  } = useAppSelector((state: { gameplay: IGameplay }) => state.gameplay);
  const user = useAppSelector((state) => state.user.user) as IUser;
  const _id = user ? user._id : '';
  const waitToSeatIDs = waitToSeat.map((u) => u._id);

  const [currentValue, setCurrentValue] = useState(BLIND_SIZE);
  const minBet = currentUser ? currentBet - currentUser.gameState.bet + BLIND_SIZE : 0;
  const maxBet = currentUser ? currentUser.gameState.stack : 10000;
  // useEffect(() => {
  //   connectSocket(user);
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (currentUser && currentUser._id === _id) {
      timerId = setInterval(() => {
        if (timerRef.current === 0) {
          timerRef.current = TIMER;
          dispatch(foldActionThunk({ _id }));
          clearTimeout(timerId);
        } else {
          timerRef.current -= 1;
          setTimer(timerRef.current);
        }
      }, 1000);
    }
    return () => {
      timerRef.current = TIMER;
      clearTimeout(timerId);
    };
  }, [currentUser]);

  useEffect(() => {
    setCurrentValue(minBet);
    if (
      (!isDeal && waitToSeat.length > 1) ||
      stage === 4 ||
      (stage === 100 && usersAtTable.length > 1) ||
      (waitToSeat.length > 1 && usersAtTable.length === 1)
    ) {
      if (stage === 4) {
        const winnersInfo = winners?.map((w) => [
          w.nickname,
          t(`PC_${w.gameState.combinationRating}`),
        ]);
        toast.success(`${winnersInfo?.join(' & ')} ${t('takePot')}`);
      }
      if (stage === 100 && usersInDeal[0]) {
        toast.success(`${usersInDeal[0].nickname} ${t('takePot')}`);
      }
      if (waitToSeat.length && user._id === waitToSeat[0]._id) {
        const newUsers = _.differenceBy(waitToSeat, usersAtTable, '_id');
        if (newUsers.length > 0) {
          toast(`${newUsers.map((u) => u.nickname).join(' & ')} ${t('joinGame')}`);
        }

        setTimeout(() => {
          const deck = shuffle();
          dispatch(restartDealFetch({ deck, usersAtTable, indexOfSB }));
        }, 3000);
      } else if (usersAtTable.length && user._id === usersAtTable[0]._id) {
        setTimeout(() => {
          const deck = shuffle();
          dispatch(restartDealFetch({ deck, usersAtTable, indexOfSB }));
        }, 3000);
      }
    }
  }, [stage, waitToSeat]);

  const handleCheck = () => {
    dispatch(checkActionFetch({ _id }));
  };

  const handleBet = ({ _id, betSize }: { _id: string; betSize: number }) => {
    dispatch(betActionThunk({ _id, betSize }));
  };

  const handleCall = () => {
    dispatch(callActionThunk({ _id }));
  };

  const handleFold = () => {
    dispatch(foldActionThunk({ _id }));
  };

  return (
    <div className='poker-table__wrapper'>
      <div className='poker__background'>
        <div className='poker-table__container gradient-border' id='box'>
          <div className='additional-features'>
            <SoundOnOff />
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
              <h4>{bank} $</h4>
            </div>
            {Boolean(usersAtTable.length) && (
              <div className='players-in-deal'>
                <RenderPlayer timer={timer} users={usersAtTable} />
              </div>
            )}
          </div>
          <div className='poker-table__seat-btn action__buttons'>
            {waitToSeatIDs.includes(_id) ? <SeatOutBtn /> : <SeatBtn />}
          </div>
          <div className='action__bar'>
            {currentUser && currentUser._id === _id && (
              <div>
                <div className='action__buttons'>
                  <button className='action__buttons__fold' onClick={handleFold}>
                    {t('fold')}
                  </button>
                  {!!currentBet && (
                    <button className='action__buttons__Call' onClick={handleCall}>
                      {t('call')}
                    </button>
                  )}
                  {userOptions.includes('check') && (
                    <button className='action__buttons__Call' onClick={handleCheck}>
                      {t('check')}
                    </button>
                  )}
                  {currentValue <= currentUser.gameState.stack && usersCount > usersAllin + 1 && (
                    <button
                      className='action__buttons__RaiseTo'
                      onClick={() => handleBet({ _id, betSize: currentValue })}
                    >
                      {t('raise to')}
                    </button>
                  )}
                </div>
                {currentValue <= currentUser.gameState.stack && usersCount > usersAllin + 1 && (
                  <div className='action__bar__slider'>
                    <CustomizedSlider
                      currentValue={currentValue}
                      setCurrentValue={setCurrentValue}
                      minValue={minBet}
                      maxValue={maxBet}
                    />
                  </div>
                )}
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
