// import { useAddPlayerMutation } from '../../services/gameplayApi';
import React, { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { seatUser } from '../../store/gameplaySlice';
import { IUser } from '../../types/interfaces';

interface ISeatOutBtnProps {
  togleSeatBtn: () => void;
}

const SeatOutBtn = (props: ISeatOutBtnProps) => {
  const { togleSeatBtn } = props;
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const handleSeatOut = () => {
    togleSeatBtn();
    console.log('seatOut'); // TODO SeatOut
  };

  return (
    user && (
      <button className='seat-btn' onClick={() => handleSeatOut()}>
        SeatOut
      </button>
    )
  );
};

export default SeatOutBtn;
