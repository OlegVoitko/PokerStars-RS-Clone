import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { registerUser } from '../../store/userSlice';
import { useAppDispatch } from '../../hooks/hook';
import './EnterChoice.scss';
import { START_BANKROLL } from '../../utils/constants';
import { connectSocket } from 'socket';

const EnterChoice = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const guestEnterHandle = (): void => {
    const guest = {
      _id: String(Date.now()),
      nickname: 'Guest',
      password: '',
      bankroll: START_BANKROLL,
      gameState: {
        hand: [],
        stack: START_BANKROLL,
        state: 'wait',
        bet: 0,
        roundBets: 0,
        action: false,
        bestCombination: [],
        restBestCards: [],
        combinationRating: 0,
      },
    };
    dispatch(registerUser(guest));
    // connectSocket(guest);
    navigate('/table');
  };

  return (
    <div className='app-enter-buttons__container'>
      <button className='app-enter-buttons__button' onClick={() => navigate('/register')}>
        {t('register')}
      </button>
      <button className='app-enter-buttons__button' onClick={() => navigate('/login')}>
        {t('login')}
      </button>
      <button className='app-enter-buttons__button' onClick={guestEnterHandle}>
        {t('guest')}
      </button>
    </div>
  );
};

export default EnterChoice;
