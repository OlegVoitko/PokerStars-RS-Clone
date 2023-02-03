import { socket } from '../../socket';

const SeatBtn = () => {
  const plyaerId = 1; // hardcode player ID

  const handleSeat = (id: number): void => {
    socket.emit('playerSeat', { playerId: id });
    console.log('seat');
  };

  return (
    <button className='seat-btn' onClick={() => handleSeat(plyaerId)}>
      Seat
    </button>
  );
};

export default SeatBtn;
