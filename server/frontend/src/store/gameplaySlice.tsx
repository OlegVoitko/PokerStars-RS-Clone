import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { socket } from '../socket';
import { ICard } from '../components/Cards/Card';
import { deal } from '../components/Poker-table/gameLogic/gameLogic';
import { shuffle } from '../components/Cards/Card';

export interface IPlayer {
  id: number;
  hand: ICard[];
  stack: number;
  bet: number;
  action: string;
}

export interface IGameplay {
  playersCount: number;
  activePosition: number;
  isDeal: boolean;
  playersInDeal: IPlayer[];
  currentPlayer: IPlayer | null;
  board: ICard[];
  wait: IPlayer[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: IGameplay = {
  playersCount: 0,
  activePosition: 0,
  isDeal: false,
  playersInDeal: [],
  currentPlayer: null,
  board: [],
  wait: [],
  loading: 'idle',
};

export const seatPlayer = createAsyncThunk('game/seatPlayer', async (player: IPlayer) => {
  socket.emit('game:seatPlayer', player);
  return player;
});

export const updateGameFetch = createAsyncThunk('game/updateGame', async (game: IGameplay) => {
  console.log(game);
  socket.emit('game:updateGame', game);
  return game;
});

const gameplaySlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    playerSeat: (state, { payload }: { payload: IPlayer[] }) => {
      if (!state.isDeal && payload.length === 2) {
        const deck = shuffle();
        state.playersCount = 2;
        state.isDeal = true;
        state.currentPlayer = payload[state.activePosition];
        state.playersInDeal.push(...payload);
        state.board.push(...deck.slice(0, 5));
        deal(state.playersInDeal, deck.slice(5));
        state.wait = [];
      } else {
        state.wait = payload;
      }
    },
    checkAction: (state, { payload }: { payload: { id: number } }) => {
      const currentPlayer = state.playersInDeal.find(({ id }) => id === payload.id) as IPlayer;
      currentPlayer.action = 'check';
      const nextPlayer =
        state.activePosition + 1 > state.playersCount - 1 ? 0 : state.activePosition + 1;
      state.currentPlayer = state.playersInDeal[nextPlayer];
      state.activePosition = nextPlayer;
    },
    updateGame: (state, { payload }: { payload: IGameplay }) => {
      state = payload;
    },
  },
});

export const { playerSeat, checkAction, updateGame } = gameplaySlice.actions;

export default gameplaySlice.reducer;
