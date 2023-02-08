export interface ICard {
  cardFace: string;
  suit: string;
  value: number;
}

export interface IUserGamestate {
  hand: ICard[];
  stack: number;
  bet: number;
  state: string;
  action: string; //'check' | 'fold' | 'call'
}

export interface IUser {
  nickname: string;
  password: string;
  _id: string;
  __v?: number;
  bankroll: number;
  gameState: IUserGamestate;
}

export interface INewUser {
  nickname: string;
  password: string;
}

export interface IErrorResponse {
  error: string;
}

export interface IUserState {
  user: IUser | null;
  status: string | null;
  error: string | null;
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
