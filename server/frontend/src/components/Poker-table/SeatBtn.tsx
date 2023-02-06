// import { useAddPlayerMutation } from '../../services/gameplayApi';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
import { IPlayer } from '../../store/gameplaySlice';
import { seatPlayer } from '../../store/gameplaySlice';

const SeatBtn = () => {
  const player1 = useAppSelector((state) => state.player.player);
  const id = player1?._id as string;
  console.log(player1, id);
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
    console.log('seat');
  };

  return (
    <button className='seat-btn' onClick={() => handleSeat(player)}>
      Seat
    </button>
  );
};

export default SeatBtn;
