import { io, Socket } from 'socket.io-client';
import store from './store/store';
import { addMessage } from './store/chatSlice';
import { IMessage } from './store/chatSlice';
import { IGamePlay, IPlayer, playerSeat } from './store/gameplaySlice';

interface ServerToClientEvents {
  ['new message']: (data: IMessage) => void;
  addPlayer: (data: IPlayer) => void;
}

interface ClientToServerEvents {
  send: (data: IMessage) => void;
  addPlayer: (data: IPlayer) => void;
  updateGameplay: (data: IGamePlay) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io('http://localhost:8000/');

socket.on('new message', (data) => {
  store.dispatch(addMessage(data));
});

socket.on('addPlayer', (data) => {
  console.log('seat from server');
  store.dispatch(playerSeat(data));
});
