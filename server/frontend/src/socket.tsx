import { io, Socket } from 'socket.io-client';
import store from './store/store';
import { addMessage } from './store/chatSlice';
import { IMessage } from './store/chatSlice';
import { IGameplay, IPlayer, playerSeat, updateGame } from './store/gameplaySlice';
import { registerPlayer } from './store/playerSlice';

interface ServerToClientEvents {
  ['new message']: (data: IMessage) => void;
  ['game:seatPlayer']: (data: IPlayer[]) => void;
  ['game:updateGame']: (data: IGameplay) => void;
  test: (id: number) => void;
}

interface ClientToServerEvents {
  send: (data: IMessage) => void;
  ['game:seatPlayer']: (data: IPlayer) => void;
  ['game:updateGame']: (data: IGameplay) => void;
  updateGameplay: (data: IGameplay) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io('http://localhost:8000/');

socket.on('new message', (data) => {
  store.dispatch(addMessage(data));
});

socket.on('game:seatPlayer', (data) => {
  console.log('seat from server');
  store.dispatch(playerSeat(data));
});
socket.on('game:updateGame', (data) => {
  console.log('updateGame', data);
  store.dispatch(updateGame(data));
});

socket.on('test', (data) => {
  store.dispatch(registerPlayer(data));
});
