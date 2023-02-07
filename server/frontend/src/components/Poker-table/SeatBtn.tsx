// import { useAddPlayerMutation } from '../../services/gameplayApi';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { IPlayer } from '../../types/gameInterfaces';
import { seatPlayer } from '../../store/gameplaySlice';

const SeatBtn = () => {
  const player1 = useAppSelector((state) => state.user.user);
  const id = player1?._id as string;
  const dispatch = useAppDispatch();
  const player = {
    id,
    hand: [],
    stack: 1000,
    action: 'wait',
    bet: 0,
  }; // hardcode player ID

  const handleSeat = (player: IPlayer): void => {
    dispatch(seatPlayer(player));
  };

  return (
    <button className='seat-btn' onClick={() => handleSeat(player)}>
      Seat
    </button>
  );
};

export default SeatBtn;
