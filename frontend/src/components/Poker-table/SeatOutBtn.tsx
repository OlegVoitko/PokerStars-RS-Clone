// import { useAddPlayerMutation } from '../../services/gameplayApi';
import React, { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { seatOutUserThunk } from '../../store/gameplaySlice';
import { IUser } from '../../types/interfaces';

interface ISeatOutBtnProps {
  togleSeatBtn: () => void;
}

const SeatOutBtn = (props: ISeatOutBtnProps) => {
  const { togleSeatBtn } = props;
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const handleSeatOut = (user: IUser) => {
    togleSeatBtn();
    console.log('seatOut'); // TODO SeatOut
    dispatch(seatOutUserThunk(user));
  };

  return (
    user && (
      <button className='seat-btn' onClick={() => handleSeatOut(user)}>
        SeatOut
      </button>
    )
  );
};

export default SeatOutBtn;
