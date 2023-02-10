// import { useAddPlayerMutation } from '../../services/gameplayApi';
import React, { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { seatUser } from '../../store/gameplaySlice';
import { IUser } from '../../types/interfaces';

interface ISeatBtnProps {
  togleSeatBtn: () => void;
}

const SeatBtn = (props: ISeatBtnProps) => {
  const { togleSeatBtn } = props;
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (user && waitToSeat.filter((u) => u._id === user._id).length > 0) {
  //     setDisabled((disabled) => !disabled);
  //   }
  // }, [waitToSeat]);

  const handleSeat = (user: IUser): void => {
    togleSeatBtn();
    dispatch(seatUser(user));
  };

  return (
    user && (
      <button className='seat-btn' onClick={() => handleSeat(user)}>
        Seat
      </button>
    )
  );
};

export default SeatBtn;