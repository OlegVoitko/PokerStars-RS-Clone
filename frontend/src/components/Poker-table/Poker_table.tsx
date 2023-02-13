import React, { useEffect, useState } from 'react';
import Chat from '../Chat/Chat';
import './Poker_table.scss';
import CustomizedSlider from './Slider_table';
import Sound from './SoundOnOff';
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
import { BLIND_SIZE } from '../../utils/constants';
import '../Cards-style/RenderCards.scss';
import { RenderCards } from 'components/Cards-style';
import { RenderPlayer } from 'components/Cards-style/PlayerCards';

const Poker_table = (): JSX.Element => {
  const [isShowSeat, setIsShowSeat] = useState(true);
  const dispatch = useAppDispatch();
  const {
    usersInDeal,
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
  const [currentValue, setCurrentValue] = useState(20);

  // const renderPlayer = (users: IUser[]) =>
  //   users.map((u, i) => (
  //     <div className='player' key={i}>
  //       <div className='player-two-cards'>
  //         <div className='playing-card1'>
  //           {' '}
  //           {`${u.gameState.hand[0].cardFace}${u.gameState.hand[0].suit}`}
  //         </div>
  //         <div className='playing-card2'>
  //           {' '}
  //           {`${u.gameState.hand[1].cardFace}${u.gameState.hand[1].suit}`}
  //         </div>
  //       </div>
  //       <div className='player-avatar-container'>
  //         <img
  //           className='player-avatar_img'
  //           src={require('../../assets/deadline.png')}
  //           alt='Avatar'
  //         />
  //       </div>
  //       <h4 className='player-name'>Oleg</h4>
  //       <h4 className='player-stack'>$ {u.gameState.stack}</h4>
  //     </div>
  //   ));

  // const renderPlayer = (users: IUser[]) =>
  //   users.map((u, i) => (
  //     <div className='player' key={i}>
  //       Stack: {u.gameState.stack}
  //       <br />
  //       hand:{' '}
  //       {`${u.gameState.hand[0].cardFace}${u.gameState.hand[0].suit} ${u.gameState.hand[1].cardFace}${u.gameState.hand[1].suit}`}
  //     </div>
  //   ));

  // const renderCards = (cards: ICard[]) => {
  //   return cards.map((card, i) => (
  //     <div key={i}>
  //       {card.cardFace} {card.suit}
  //     </div>
  //   ));
  // };

  useEffect(() => {
    // if (stage === 4 || stage === 100 || (!isDeal && wait.length === 2) || ) {
    if ((!isDeal && waitToSeat.length === 2) || stage === 4 || stage === 100) {
      setTimeout(() => {
        console.log('start');
        const deck = shuffle();
        dispatch(restartDealFetch(deck));
      }, 3000);
    }
  }, [dispatch, stage, waitToSeat]);

  const handleCheck = () => {
    dispatch(checkActionFetch());
  };

  const handleBet = () => {
    console.log('bet');
    console.log('currentValue', currentValue);
    dispatch(betActionThunk({ _id, betSize: currentValue }));
  };

  const handleCall = () => {
    console.log('call');
    dispatch(callActionThunk({ _id }));
  };

  const handleFold = () => {
    console.log('fold', _id);
    dispatch(foldActionThunk({ _id }));
  };
  const togleSeatBtn = () => setIsShowSeat(!isShowSeat);

  const minBet = currentBet - user.gameState.bet + BLIND_SIZE;
  const maxBet = user.gameState.stack - user.gameState.bet;
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
            {/* <div className='card__container'>{renderCards(showCards)}</div> */}
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
              <SeatBtn togleSeatBtn={togleSeatBtn} />
            </div>
          )}
          {!isShowSeat && (
            <div className='poker-table__seat-btn action__buttons'>
              <SeatOutBtn togleSeatBtn={togleSeatBtn} />
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
                  <button className='action__buttons__RaiseTo' onClick={handleBet}>
                    Raise To
                  </button>
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
