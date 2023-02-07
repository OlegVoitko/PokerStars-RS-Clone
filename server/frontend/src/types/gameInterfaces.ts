import { ICard } from './interfaces';

export interface IPlayer {
  id: string;
  hand: ICard[];
  stack: number;
  bet: number;
  action: string;
}

export interface IGameplay {
  stage: number;
  playersCount: number;
  playersCompleteAction: number;
  activePosition: number;
  isDeal: boolean;
  playersInDeal: IPlayer[];
  currentPlayer: IPlayer | null;
  board: ICard[];
  showCards: ICard[];
  wait: IPlayer[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}