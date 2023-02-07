import React from 'react';
import './EnterChoice.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { registerPlayer } from '../../store/playerSlice';
import { useAppDispatch } from '../../hooks/hook';

const EnterChoice = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const g = () => {
    dispatch(registerPlayer({ _id: String(Date.now()), nickname: 'guest', password: '' }));
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
      <button className='app-enter-buttons__button' onClick={g}>
        {t('guest')}
      </button>
    </div>
  );
};

export default EnterChoice;
