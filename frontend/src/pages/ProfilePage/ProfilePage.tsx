import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/hook';
import { IGameplay, IUser } from 'types/interfaces';
import { useTranslation } from 'react-i18next';
import { upBalance } from '../../store/gameplaySlice';
import './style.scss';
import '../../components/Poker-table/Poker_table.scss';

const ProfilePage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user) as IUser;
  const { waitToSeat, usersAtTable } = useAppSelector(
    (state: { gameplay: IGameplay }) => state.gameplay
  );
  const waitToSeatIDs = waitToSeat.map((u) => u._id);
  const handleBankroll = () => {
    dispatch(upBalance(user));
  };
  return (
    <section className='container profile'>
      <h1 className='profile__title'>{t('profile')}</h1>
      <div className='profile__wrap'>
        <div className='profile__avatar'></div>
        <h2 className='profile__nick'>
          {t('nick')}: {user.nickname}
        </h2>
        <div className='profile__bankroll'>
          {t('bankroll')}: {user.bankroll}$
          {/*{t('bankroll')}:{' '}*/}
          {/*{waitToSeatIDs.includes(user._id)*/}
          {/*  ? waitToSeat.filter((u) => u._id === user._id)[0].gameState.stack*/}
          {/*  : user.bankroll}*/}
          {/*$*/}
        </div>
      </div>

      {user.bankroll === 0 ||
        waitToSeat.filter((u) => u._id === user._id)[0].gameState.stack === 0 ||
        (usersAtTable.filter((u) => u._id === user._id)[0].gameState.stack === 0 && (
          <div className='action__buttons'>
            <button className='action__buttons__fold' onClick={handleBankroll}>
              {t('upToBankroll')}
            </button>
          </div>
        ))}

      <Link className='profile__link' to={'/table'}>
        {t('backTable')}
      </Link>
    </section>
  );
};

export default ProfilePage;
