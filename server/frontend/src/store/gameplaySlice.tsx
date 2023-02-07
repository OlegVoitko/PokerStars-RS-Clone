import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { socket } from '../socket';
import { ICard } from '../components/Cards/Card';
import { deal } from '../components/Poker-table/gameLogic/gameLogic';
import { shuffle } from '../components/Cards/Card';

export interface IPlayer {
  id: string;
  hand: ICard[];
  stack: number;
  bet: number;
  action: string;
}

export interface IGameplay {
  stage: number;
  playersCount: number;
  playersCompleteAction: number;
  activePosition: number;
  isDeal: boolean;
  playersInDeal: IPlayer[];
  currentPlayer: IPlayer | null;
  board: ICard[];
  showCards: ICard[];
  wait: IPlayer[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: IGameplay = {
  stage: 0,
  playersCount: 0,
  playersCompleteAction: 0,
  activePosition: 0,
  isDeal: false,
  playersInDeal: [],
  currentPlayer: null,
  board: [],
  showCards: [],
  wait: [],
  loading: 'idle',
};

export const seatPlayer = createAsyncThunk('game/seatPlayer', async (player: IPlayer) => {
  socket.emit('game:seatPlayer', player);
  return player;
});

export const checkActionFetch = createAsyncThunk(
  'game/checkAction',
  async (data: { id: string }) => {
    socket.emit('game:checkAction', data);
    return data;
  }
);
export const restartDealFetch = createAsyncThunk('game/restartDeal', async () => {
  socket.emit('game:restartDeal');
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
    checkAction: (state, { payload }: { payload: { id: string } }) => {
      state.playersCompleteAction += 1;
      if (state.playersCompleteAction === state.playersCount) {
        state.stage += 1;
        state.playersCompleteAction = 0;
        state.activePosition = 0;
        state.currentPlayer = state.playersInDeal[0];
        if (state.stage === 1) {
          state.showCards.push(...state.board.slice(0, 3));
        }
        if (state.stage === 2) {
          state.showCards.push(state.board[3]);
        }
        if (state.stage === 3) {
          state.showCards.push(state.board[4]);
        }
        if (state.stage === 4) {
          state.showCards = [{ cardFace: 'SHOWDOWN', value: 0, suit: '' }];
        }
        return;
      }

      const currentPlayer = state.playersInDeal.find(({ id }) => id === payload.id) as IPlayer;
      currentPlayer.action = 'check';
      const nextPlayer =
        state.activePosition + 1 > state.playersCount - 1 ? 0 : state.activePosition + 1;
      state.currentPlayer = state.playersInDeal[nextPlayer];
      state.activePosition = nextPlayer;
    },
    restartDeal: (state) => {
      const deck = shuffle();
      state.board.push(...deck.slice(0, 5));
      deal(state.playersInDeal, deck.slice(5));
      state.stage = 0;
      state.activePosition = 0;
      state.currentPlayer = state.playersInDeal[0];
      state.showCards = [];
      state.wait = [];
    },
    updateGame: (state, { payload }: { payload: IGameplay }) => {
      state = payload;
    },
  },
});

export const { playerSeat, checkAction, updateGame, restartDeal } = gameplaySlice.actions;

export default gameplaySlice.reducer;
