import { io, Socket } from 'socket.io-client';
import store from './store/store';
import { addMessage } from './store/chatSlice';
import { IMessage } from './store/chatSlice';
import { ICard } from './types/interfaces';
import { playerSeat, checkAction, restartDeal } from './store/gameplaySlice';
import { IGameplay, IPlayer } from './types/gameInterfaces';

interface ServerToClientEvents {
  ['new message']: (data: IMessage) => void;
  ['game:seatPlayer']: (data: IPlayer[]) => void;
  ['game:checkAction']: (data: { id: string }) => void;
  ['game:restartDeal']: (deck: ICard[]) => void;
  test: (id: number) => void;
}

interface ClientToServerEvents {
  send: (data: IMessage) => void;
  ['game:seatPlayer']: (data: IPlayer) => void;
  ['game:checkAction']: (data: { id: string }) => void;
  ['game:restartDeal']: (deck: ICard[]) => void;
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
socket.on('game:restartDeal', (deck) => {
  store.dispatch(restartDeal(deck));
});
