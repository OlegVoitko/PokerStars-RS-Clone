// import { useAddPlayerMutation } from '../../services/gameplayApi';
import React, { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { seatOutUserThunk } from '../../store/gameplaySlice';
import { IUser } from '../../types/interfaces';

interface ISeatOutBtnProps {
  toggleSeatBtn: () => void;
}

const SeatOutBtn = (props: ISeatOutBtnProps) => {
  const { toggleSeatBtn } = props;
  const user = useAppSelector((state) => state.gameplay.currentUser) as IUser;
  const dispatch = useAppDispatch();

  const handleSeatOut = (user: IUser) => {
    toggleSeatBtn();
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
