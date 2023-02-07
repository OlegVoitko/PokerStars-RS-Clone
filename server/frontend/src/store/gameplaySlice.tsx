import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { socket } from '../socket';
import { ICard, IUser } from '../types/interfaces';
import { IPlayer, IGameplay } from '../types/gameInterfaces';
import { deal } from '../utils/gameHelper';
// import { deal } from '../components/Poker-table/gameLogic/gameLogic';

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

export const seatPlayer = createAsyncThunk('game/seatPlayer', async (user: IUser) => {
  socket.emit('game:seatPlayer', user);
  return user;
});

export const checkActionFetch = createAsyncThunk(
  'game/checkAction',
  async (data: { id: string }) => {
    socket.emit('game:checkAction', data);
    return data;
  }
);
export const restartDealFetch = createAsyncThunk('game/restartDeal', async (deck: ICard[]) => {
  socket.emit('game:restartDeal', deck);
  return deck;
});

const gameplaySlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    playerSeat: (state, { payload }: { payload: IPlayer[] }) => {
      state.wait = payload;
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
    restartDeal: (state, { payload: deck }: { payload: ICard[] }) => {
      state.isDeal = true;
      state.playersCount += state.wait.length;
      state.board = deck.slice(0, 5);
      state.stage = 0;
      state.activePosition = 0;
      state.showCards = [];
      state.playersInDeal.push(...state.wait);
      const hands = deal(state.playersInDeal.length, deck.slice(5));
      state.playersInDeal.forEach((p, i) => (p.hand = hands[i]));
      state.wait = [];
      state.currentPlayer = state.playersInDeal[0];
    },
  },
});

export const { playerSeat, checkAction, restartDeal } = gameplaySlice.actions;

export default gameplaySlice.reducer;
