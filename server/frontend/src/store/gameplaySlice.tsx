import { createSlice } from '@reduxjs/toolkit';
import { ICard } from '../components/Cards/Card';
import { deal } from '../components/Poker-table/gameLogic/gameLogic';
import { shuffle } from '../components/Cards/Card';

export interface IPlayer {
  id: number;
  hand: ICard[];
  stack: number;
}

export interface IGamePlay {
  isDeal: boolean;
  playersInDeal: IPlayer[];
  currentPlayer: IPlayer | null;
  board: ICard[];
  wait: IPlayer[];
}

const initialState: IGamePlay = {
  isDeal: false,
  playersInDeal: [],
  currentPlayer: null,
  board: [],
  wait: [],
};

const gameplaySlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    playerSeat: (state, { payload }: { payload: IPlayer }) => {
      if (!state.isDeal && state.wait.length === 1) {
        const deck = shuffle();
        state.isDeal = true;
        state.playersInDeal.push(...state.wait, payload);
        state.board.push(...deck.slice(0, 5));
        deal(state.playersInDeal, deck.slice(5));
        state.wait = [];
      } else {
        state.wait.push(payload);
      }
    },
    updateGameplay: (state, { payload }: { payload: IGamePlay }) => {
      state = payload;
    },
  },
});

export const { playerSeat } = gameplaySlice.actions;

export default gameplaySlice.reducer;
