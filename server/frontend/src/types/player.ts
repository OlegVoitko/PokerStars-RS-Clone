export interface IPlayer {
  nickname: string;
  password: string;
  _id: string;
  __v?: number;
}

export interface NewUser {
  nickname: string;
  password: string;
}

export interface Player extends NewUser {
  _id: string;
}

// export interface ErrorAuth {
//   data: string,
//   status: number
// }

export interface ErrorResponse {
  error: string;
}
