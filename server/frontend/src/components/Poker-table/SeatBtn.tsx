import { useAddPlayerMutation } from '../../services/gameplayApi';
import { IPlayer } from '../../store/gameplaySlice';

const SeatBtn = () => {
  const [addPlayer] = useAddPlayerMutation();
  const player = {
    id: 1,
    hand: [],
    stack: 1000,
  }; // hardcode player ID

  const handleSeat = (player: IPlayer): void => {
    addPlayer(player);
    console.log('seat');
  };

  return (
    <button className='seat-btn' onClick={() => handleSeat(player)}>
      Seat
    </button>
  );
};

export default SeatBtn;
