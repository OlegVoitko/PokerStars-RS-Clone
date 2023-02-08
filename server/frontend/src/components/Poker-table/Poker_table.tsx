import React, { useEffect, useState } from 'react';
import Chat from '../Chat/Chat';
import './Poker_table.scss';
import CustomizedSlider from './Slider_table';
import Sound from './SoundOnOff';
import SeatBtn from './SeatBtn';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { shuffle } from '../../utils/gameHelper';
import { ICard, IUser, IGameplay } from '../../types/interfaces';
import {
  checkActionFetch,
  restartDealFetch,
  betActionThunk,
  callActionThunk,
  foldActionThunk,
} from '../../store/gameplaySlice';

const Poker_table = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { usersInDeal, isDeal, wait, currentUser, showCards, stage, betToCall, bank, userOptions } =
    useAppSelector((state: { gameplay: IGameplay }) => state.gameplay);
  const user = useAppSelector((state) => state.user.user) as IUser;
  const { _id, gameState } = user;
  const [currentValue, setCurrentValue] = useState(20);

  const renderPlayer = (users: IUser[]) =>
    users.map((u, i) => (
      <div className='player' key={i}>
        Stack: {u.gameState.stack}
        <br />
        hand:{' '}
        {`${u.gameState.hand[0].cardFace}${u.gameState.hand[0].suit} ${u.gameState.hand[1].cardFace}${u.gameState.hand[1].suit}`}
      </div>
    ));

  const renderCards = (cards: ICard[]) => {
    return cards.map((card, i) => (
      <div key={i}>
        {card.cardFace} {card.suit}
      </div>
    ));
  };

  useEffect(() => {
    if (stage === 4 || (!isDeal && wait.length === 2)) {
      setTimeout(() => {
        const deck = shuffle();
        dispatch(restartDealFetch(deck));
      }, 3000);
    }
  }, [dispatch, stage, wait]);

  const handleCheck = () => {
    dispatch(checkActionFetch({ _id }));
  };

  const handleBet = () => {
    console.log('bet');
    console.log('currentValue', currentValue);
    dispatch(betActionThunk({ _id, betSize: currentValue }));
  };

  const handleCall = () => {
    console.log('call');
    const callSize = betToCall - gameState.bet;
    dispatch(callActionThunk({ _id, callSize }));
  };

  const handleFold = () => {
    console.log('fold');
    dispatch(foldActionThunk({ _id }));
  };

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
          <div className='card__container'>{renderCards(showCards)}</div>
          <div className='bank__container'>
            <img src={require('../../assets/chip-bank.png')} alt='chip bank' />
            <h4>{bank}$</h4>
          </div>
          <div className='poker-table__seat-btn action__buttons'>
            <SeatBtn />
          </div>
          <div className='action__bar'>
            {currentUser?._id === _id && (
              <div>
                <div className='action__buttons'>
                  {userOptions.includes('fold') && (
                    <button className='action__buttons__fold' onClick={handleFold}>
                      Fold
                    </button>
                  )}
                  {!!betToCall && (
                    <button className='action__buttons__Call' onClick={handleCall}>
                      Call
                    </button>
                  )}
                  <button className='action__buttons__Call'>Call</button>
                  {userOptions.includes('check') && (
                    <button className='action__buttons__Call' onClick={handleCheck}>
                      Check
                    </button>
                  )}
                  <button className='action__buttons__RaiseTo' onClick={handleBet}>
                    Raise To
                  </button>
                </div>
                <div className='action__bar__slider'>
                  <CustomizedSlider currentValue={currentValue} setCurrentValue={setCurrentValue} />
                </div>
              </div>
            )}
            <section className='tableroom__chat'>
              <Chat />
            </section>
          </div>
          <div className='players-in-deal'>{renderPlayer(usersInDeal)}</div>
        </div>
      </div>
    </div>
  );
};

export default Poker_table;
