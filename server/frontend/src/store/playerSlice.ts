import { createSlice } from '@reduxjs/toolkit';

export type PlayerState = {
  isAuth: boolean;
  id: number;
  nick: string;
  password: string;
  coins: number;
};

const initialState = {
  isAuth: false,
  id: 0,
  nick: '',
  password: '',
  coins: 0,
} as PlayerState;

const playerSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    registerPlayer(state, { payload }: { payload: number }) {
      state.id = payload;
    },
    getFirstCoins() {},
    winCoins() {},
    loseCoins() {},
  },
});

export const { registerPlayer, getFirstCoins, winCoins, loseCoins } = playerSlice.actions;

export default playerSlice.reducer;
