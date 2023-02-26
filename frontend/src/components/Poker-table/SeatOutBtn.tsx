// import { useAddPlayerMutation } from '../../services/gameplayApi';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { seatOutUserThunk } from '../../store/gameplaySlice';
import { IGameplay, IUser } from '../../types/interfaces';

// interface ISeatOutBtnProps {
//   toggleSeatBtn: () => void;
// }
//
// const SeatOutBtn = (props: ISeatOutBtnProps) => {
const SeatOutBtn = () => {
  // const SeatOutBtn = () => {
  const { t } = useTranslation();
  // const { toggleSeatBtn } = props;
  const user = useAppSelector((state) => state.user.user) as IUser;
  const { usersInDeal } = useAppSelector((state: { gameplay: IGameplay }) => state.gameplay);

  const dispatch = useAppDispatch();

  const handleSeatOut = (user: IUser) => {
    // toggleSeatBtn();
    const actualUserState = usersInDeal.filter((u) => u._id === user._id)[0];
    console.log('seatOut', actualUserState); // TODO SeatOut
    // dispatch(seatOutUserThunk(user));
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
