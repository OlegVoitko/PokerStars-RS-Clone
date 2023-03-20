import { io, Socket } from 'socket.io-client';
import store from './store/store';
import { addMessage } from './store/chatSlice';
import { IMessage } from './store/chatSlice';
import { ICard, IUser, IGameplay } from './types/interfaces';
import {
  userSeat,
  userSeatOut,
  checkAction,
  restartDeal,
  betAction,
  callAction,
  foldAction,
} from './store/gameplaySlice';

export interface IRestartDeal {
  deck: ICard[];
  usersAtTable: IUser[];
  indexOfSB: number;
}

interface ServerToClientEvents {
  ['new message']: (data: IMessage) => void;
  ['game:seatUser']: (data: IUser) => void;
  ['game:seatOutUser']: (data: IUser) => void;
  ['game:checkAction']: (data: { _id: string }) => void;
  ['game:betAction']: (data: { _id: string; betSize: number }) => void;
  ['game:callAction']: (data: { _id: string }) => void;
  ['game:foldAction']: (data: { _id: string }) => void;
  ['game:restartDeal']: (data: IRestartDeal) => void;
  test: (id: number) => void;
}

interface ClientToServerEvents {
  send: (data: IMessage) => void;
  ['game:seatUser']: (data: IUser) => void;
  ['game:seatOutUser']: (data: IUser) => void;
  ['game:checkAction']: (data: { _id: string }) => void;
  ['game:betAction']: (deck: { _id: string; betSize: number }) => void;
  ['game:callAction']: (data: { _id: string }) => void;
  ['game:foldAction']: (data: { _id: string }) => void;
  ['game:restartDeal']: (data: IRestartDeal) => void;
  updateGameplay: (data: IGameplay) => void;
}

export let socket: Socket<ServerToClientEvents, ClientToServerEvents>;

export const connectSocket = (user: IUser) => {
  socket = io('http://localhost:8000/', {
    auth: {
      user,
    },
  });

  socket.on('new message', (data) => {
    store.dispatch(addMessage(data));
  });

  socket.on('game:seatUser', (data) => {
    console.log('seat from server');
    store.dispatch(userSeat(data));
  });
  socket.on('game:seatOutUser', (data) => {
    store.dispatch(userSeatOut(data));
  });
  socket.on('game:checkAction', (data) => {
    store.dispatch(checkAction(data));
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
  socket.on('game:restartDeal', (data) => {
    store.dispatch(restartDeal(data));
  });
};
