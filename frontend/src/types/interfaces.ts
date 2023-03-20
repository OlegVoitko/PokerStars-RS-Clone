export interface ICard {
  cardFace: string;
  suit: string;
  value: number;
}

export interface IUserGamestate {
  hand: ICard[];
  stack: number;
  bet: number;
  roundBets: number;
  state: string;
  action: boolean;
  bestCombination: ICard[];
  restBestCards: ICard[];
  combinationRating: number;
}

export interface IUser {
  nickname: string;
  _id: string;
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
  usersAllin: number;
  activePosition: number;
  isDeal: boolean;
  usersInDeal: IUser[];
  usersAtTable: IUser[];
  currentUser: IUser | null;
  board: ICard[];
  showCards: ICard[];
  bank: number;
  currentBet: number;
  userOptions: string[];
  waitToSeat: IUser[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  indexOfSB: number;
  winners: IUser[];
}

export interface IHand {
  usersInDial: IUser[];
  currentPlayer: IUser | null;
  board: ICard[];
}
