import { io, Socket } from 'socket.io-client';
import store from './store/store';
import { addMessage } from './store/chatSlice';
import { IMessage } from './store/chatSlice';
import { IGameplay, IPlayer, playerSeat, checkAction } from './store/gameplaySlice';

interface ServerToClientEvents {
  ['new message']: (data: IMessage) => void;
  ['game:seatPlayer']: (data: IPlayer[]) => void;
  ['game:checkAction']: (data: { id: string }) => void;
  test: (id: number) => void;
}

interface ClientToServerEvents {
  send: (data: IMessage) => void;
  ['game:seatPlayer']: (data: IPlayer) => void;
  ['game:checkAction']: (data: { id: string }) => void;
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
socket.on('game:checkAction', (data) => {
  store.dispatch(checkAction(data));
});
