import React from 'react';
import './EnterChoice.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const EnterChoice = (): JSX.Element => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className='app-enter-buttons__container'>
      <button className='app-enter-buttons__button' onClick={() => navigate('/register')}>
        {t('register')}
      </button>
      <button className='app-enter-buttons__button' onClick={() => navigate('/login')}>
        {t('login')}
      </button>
      <button className='app-enter-buttons__button' onClick={() => navigate('/table')}>
        {t('guest')}
      </button>
    </div>
  );
};

export default EnterChoice;
