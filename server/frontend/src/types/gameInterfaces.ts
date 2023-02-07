import { ICard, IUser } from './interfaces';

export interface IPlayer {
  id: string;
  hand: ICard[];
  stack: number;
  bet: number;
  action: string;
}

export interface IGameplay {
  stage: number;
  usersCount: number;
  usersCompleteAction: number;
  activePosition: number;
  isDeal: boolean;
  usersInDeal: IUser[];
  currentUser: IUser | null;
  board: ICard[];
  showCards: ICard[];
  wait: IUser[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

export interface IHand {
  usersInDial: IUser[];
  currentPlayer: IUser | null;
  board: ICard[];
}
