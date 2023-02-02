export interface NewUser {
  nickname: string,
  password: string
}

export interface Player extends NewUser {
  id: number,
}
