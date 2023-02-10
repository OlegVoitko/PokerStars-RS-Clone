import { io, Socket } from 'socket.io-client';
import store from './store/store';
import { addMessage } from './store/chatSlice';
import { IMessage } from './store/chatSlice';
import { ICard, IUser, IGameplay } from './types/interfaces';
import {
  userSeat,
  checkAction,
  restartDeal,
  betAction,
  callAction,
  foldAction,
} from './store/gameplaySlice';

interface ServerToClientEvents {
  ['new message']: (data: IMessage) => void;
  ['game:seatUser']: (data: IUser) => void;
  ['game:checkAction']: () => void;
  ['game:betAction']: (data: { _id: string; betSize: number }) => void;
  ['game:callAction']: (data: { _id: string }) => void;
  ['game:foldAction']: (data: { _id: string }) => void;
  ['game:restartDeal']: (deck: ICard[]) => void;
  test: (id: number) => void;
}

interface ClientToServerEvents {
  send: (data: IMessage) => void;
  ['game:seatUser']: (data: IUser) => void;
  ['game:checkAction']: () => void;
  ['game:betAction']: (deck: { _id: string; betSize: number }) => void;
  ['game:callAction']: (data: { _id: string }) => void;
  ['game:foldAction']: (data: { _id: string }) => void;
  ['game:restartDeal']: (deck: ICard[]) => void;
  updateGameplay: (data: IGameplay) => void;
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io('http://localhost:8000/');

socket.on('new message', (data) => {
  store.dispatch(addMessage(data));
});

socket.on('game:seatUser', (data) => {
  console.log('seat from server');
  store.dispatch(userSeat(data));
});
socket.on('game:checkAction', () => {
  store.dispatch(checkAction());
});
socket.on('game:betAction', (data) => {
  store.dispatch(betAction(data));
});
socket.on('game:callAction', (data) => {
  store.dispatch(callAction(data));
});
socket.on('game:foldAction', (data) => {
  store.dispatch(foldAction(data));
});
socket.on('game:restartDeal', (deck) => {
  store.dispatch(restartDeal(deck));
});
