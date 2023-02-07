// import { useAddPlayerMutation } from '../../services/gameplayApi';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { seatUser } from '../../store/gameplaySlice';
import { IUser } from '../../types/interfaces';

const SeatBtn = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  const handleSeat = (user: IUser): void => {
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
