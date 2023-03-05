import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { seatOutUserThunk } from '../../store/gameplaySlice';
import { IGameplay, IUser } from '../../types/interfaces';

const SeatOutBtn = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user.user) as IUser;
  const { usersInDeal, usersAtTable } = useAppSelector((state) => state.gameplay);

  const dispatch = useAppDispatch();

  const handleSeatOut = (user: IUser) => {
    const actualUserStateTable = usersAtTable.find((u) => u._id === user._id);
    const actualUserState =
      usersInDeal.find((u) => u._id === user._id) || actualUserStateTable || user;
    console.log('seatOut', actualUserState);
    dispatch(seatOutUserThunk(actualUserState));
  };

  return (
    user && (
      <button className='seat-btn' onClick={() => handleSeatOut(user)}>
        {t('seatOut')}
      </button>
    )
  );
};

export default SeatOutBtn;
