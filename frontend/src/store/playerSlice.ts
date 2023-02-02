import { createSlice } from '@reduxjs/toolkit';

export type PlayerState = {
  isAuth: boolean;
  id?: null;
  nick: string;
  password: string;
  coins: number;
};

const playerSlice = createSlice({
  name: 'players',
  initialState: {
    isAuth: false,
    id: null,
    nick: '',
    password: '',
    coins: 0,
  },
  reducers: {
    registerPlayer() {},
    // register: (state, action: PayloadAction<boolean>) => state.isAuth = action.payload,
    getFirstCoins() {},
    winCoins() {},
    loseCoins() {},
  },
});

export const { registerPlayer, getFirstCoins, winCoins, loseCoins } = playerSlice.actions;

export default playerSlice.reducer;
