import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { seatOutUserThunk } from '../../store/gameplaySlice';
import { IGameplay, IUser } from '../../types/interfaces';

const SeatOutBtn = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user.user) as IUser;
  const { usersInDeal, usersAtTable } = useAppSelector(
    (state: { gameplay: IGameplay }) => state.gameplay
  );

  const dispatch = useAppDispatch();

  const handleSeatOut = (user: IUser) => {
    const actualUserStateTable = usersAtTable.filter((u) => u._id === user._id)[0];
    const actualUserState =
      usersInDeal.filter((u) => u._id === user._id)[0] || actualUserStateTable || user;
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
