// import { useAddPlayerMutation } from '../../services/gameplayApi';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
// import { User } from '../../types/gameInterfaces';
import { seatPlayer } from '../../store/gameplaySlice';
import { setUserGamestate } from '../../store/userSlice';
import { IUser } from '../../types/interfaces';
import { START_BANKROLL } from '../../utils/constants';

const SeatBtn = () => {
  const user = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const gameState = {
    hand: [],
    stack: user?.bankroll || START_BANKROLL,
    state: 'wait',
    bet: 0,
    action: '',
  };

  const handleSeat = (user: IUser): void => {
    dispatch(setUserGamestate(gameState));
    dispatch(seatPlayer(user));
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
