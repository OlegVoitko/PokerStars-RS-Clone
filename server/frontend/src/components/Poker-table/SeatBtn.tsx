// import { useAddPlayerMutation } from '../../services/gameplayApi';
import { useAppDispatch, useAppSelector } from '../../hooks/hook';
// import { IPlayer } from '../../types/gameInterfaces';
import { seatPlayer } from '../../store/gameplaySlice';
import { setUserGamestate } from '../../store/userSlice';
import { IUser } from '../../types/interfaces';
import { START_BANKROLL } from '../../utils/constants';

const SeatBtn = () => {
  const player1 = useAppSelector((state) => state.user.user);
  // const id = player1?._id as string;
  const dispatch = useAppDispatch();
  const gameState = {
    hand: [],
    stack: player1?.bankroll || START_BANKROLL,
    state: 'wait',
    bet: 0,
  }; // hardcode player ID

  const handleSeat = (player: IUser): void => {
    const user = dispatch(setUserGamestate(gameState));
    console.log('player', player);
    dispatch(seatPlayer(user));
  };

  return (
    // <button className='seat-btn' onClick={() => handleSeat(player)}>
    player1 && (
      <button className='seat-btn' onClick={() => handleSeat(player1)}>
        Seat
      </button>
    )
  );
};

export default SeatBtn;
