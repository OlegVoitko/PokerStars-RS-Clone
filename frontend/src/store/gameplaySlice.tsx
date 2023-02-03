import { createSlice } from '@reduxjs/toolkit';

export interface IPlayerID {
  playerId: number;
}

export interface IGamePlay {
  players: IPlayerID[];
}

const initialState: IGamePlay = {
  players: [],
};

const gameplaySlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    playerSeat: (state, { payload }: { payload: IPlayerID }) => {
      state.players.push(payload);
    },
  },
});

export const { playerSeat } = gameplaySlice.actions;

export default gameplaySlice.reducer;
