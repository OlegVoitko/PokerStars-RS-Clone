import { io, Socket } from 'socket.io-client';
import store from './store/store';
import { addMessage } from './store/chatSlice';

interface ServerToClientEvents {
  ['new message']: (data: string) => void;
}

interface ClientToServerEvents {
  send: (text: string) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io('http://localhost:8000/');

socket.on('new message', (data) => {
  store.dispatch(addMessage(data));
});
