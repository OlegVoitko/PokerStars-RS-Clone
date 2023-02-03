import { io, Socket } from 'socket.io-client';
import store from './store/store';
import { addMessage } from './store/chatSlice';
import { IMessage } from './store/chatSlice';
import { IPlayerID, playerSeat } from './store/gameplaySlice';

interface ServerToClientEvents {
  ['new message']: (data: IMessage) => void;
  addPlayer: (data: IPlayerID) => void;
}

interface ClientToServerEvents {
  send: (data: IMessage) => void;
  playerSeat: (data: IPlayerID) => void;
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
