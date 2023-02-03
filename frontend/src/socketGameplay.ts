import { socket } from './socket';
import { playerSeat } from './store/gameplaySlice';
import store from './store/store';

socket.on('addPlayer', (data) => {
  console.log('seat from server11111');
  store.dispatch(playerSeat(data));
});
