// import { useAddPlayerMutation } from '../../services/gameplayApi';
import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { seatUserThunk } from '../../store/gameplaySlice';
import { IUser } from '../../types/interfaces';

// interface ISeatBtnProps {
//   toggleSeatBtn: () => void;
// }
//
// const SeatBtn = (props: ISeatBtnProps) => {
  const SeatBtn = () => {
  const { t } = useTranslation();
  // const { toggleSeatBtn } = props;
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (user && waitToSeat.filter((u) => u._id === user._id).length > 0) {
  //     setDisabled((disabled) => !disabled);
  //   }
  // }, [waitToSeat]);

  const handleSeat = (user: IUser): void => {
    // toggleSeatBtn();
    dispatch(seatUserThunk(user));
  };

  return (
    user && (
      <button className='seat-btn' onClick={() => handleSeat(user)}>
        {t('seat')}
      </button>
    )
  );
};

export default SeatBtn;
