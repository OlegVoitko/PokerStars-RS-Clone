// import { useAddPlayerMutation } from '../../services/gameplayApi';
import React, { FC, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { seatUser } from '../../store/gameplaySlice';
import { IUser } from '../../types/interfaces';

const SeatBtn = () => {
  const user = useAppSelector((state) => state.user.user);
  const { wait } = useAppSelector((state) => state.gameplay);
  const dispatch = useAppDispatch();

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (user && wait.filter((u) => u._id === user._id).length > 0) {
      setDisabled((disabled) => !disabled);
    }
  }, [wait]);

  const handleSeat = (user: IUser): void => {
    dispatch(seatUser(user));
  };

  return (
    user && (
      <button className='seat-btn' disabled={disabled} onClick={() => handleSeat(user)}>
        Seat
      </button>
    )
  );
};

export default SeatBtn;
