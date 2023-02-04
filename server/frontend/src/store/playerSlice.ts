import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPlayer } from '../types/player';

// export type PlayerState = {
//   isAuth: boolean;
//   id?: null;
//   nick: string;
//   password: string;
//   coins: number;
// };

interface IPlayerState {
  player: IPlayer | null;
}

const initialState: IPlayerState = {
  player: null,
};

const playerSlice = createSlice({
  name: 'playerSlice',
  initialState,
  // initialState: {
  //   isAuth: false,
  //   id: null,
  //   nick: '',
  //   password: '',
  //   coins: 0,
  // },
  reducers: {
    // registerPlayer: (state, action: PayloadAction<IPlayer>) => {
    //   state.player = action.payload;
    // },
    registerPlayer: (state, { payload }: { payload: IPlayer }) => {
      state.player = payload;
    },
    // register: (state, action: PayloadAction<boolean>) => state.isAuth = action.payload,
    getFirstCoins() {},
    winCoins() {},
    loseCoins() {},
  },
});

export const { registerPlayer, getFirstCoins, winCoins, loseCoins } = playerSlice.actions;

export default playerSlice.reducer;
