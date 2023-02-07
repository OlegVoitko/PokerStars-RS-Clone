import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { registerPlayer } from '../../store/playerSlice';
import { useAppDispatch } from '../../hooks/hook';
import './EnterChoice.scss';


const EnterChoice = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const guestEnterHandle = (): void => {
    const guest = {
      _id: String(Date.now()),
      nickname: 'Guest',
      password: '',
    };
    dispatch(registerPlayer(guest));
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
      {/*<button className='app-enter-buttons__button' onClick={() => navigate('/table')}>*/}
      <button className='app-enter-buttons__button' onClick={guestEnterHandle}>

        {t('guest')}
      </button>
    </div>
  );
};

export default EnterChoice;
