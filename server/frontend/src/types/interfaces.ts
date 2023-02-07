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
}

export interface IUser {
  nickname: string;
  password: string;
  _id: string;
  __v?: number;
  bankroll: number;
  gameState: IUserGamestate | null;
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
