import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { socket } from '../socket';
import { ICard, IUser, IGameplay } from '../types/interfaces';
import { deal } from '../utils/gameHelper';

const initialState: IGameplay = {
  stage: 0,
  usersCount: 0,
  usersCompleteAction: 0,
  activePosition: 0,
  isDeal: false,
  usersInDeal: [],
  currentUser: null,
  board: [],
  showCards: [],
  bank: 0,
  betToCall: 0,
  userOptions: ['fold', 'call', 'check', 'rais'],
  wait: [],
  loading: 'idle',
};

export const seatUser = createAsyncThunk('game/seatUser', async (user: IUser) => {
  socket.emit('game:seatUser', user);
  return user;
});

export const checkActionFetch = createAsyncThunk(
  'game/checkAction',
  async (data: { _id: string }) => {
    socket.emit('game:checkAction', data);
    return data;
  }
);
export const betActionThunk = createAsyncThunk(
  'game/checkAction',
  async (data: { _id: string; betSize: number }) => {
    socket.emit('game:betAction', data);
    return data;
  }
);
export const restartDealFetch = createAsyncThunk('game/restartDeal', async (deck: ICard[]) => {
  socket.emit('game:restartDeal', deck);
  return deck;
});

const gameplaySlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userSeat: (state, { payload }: { payload: IUser[] }) => {
      state.wait = payload;
    },
    checkAction: (state, { payload }: { payload: { _id: string } }) => {
      state.usersCompleteAction += 1;
      if (state.usersCompleteAction === state.usersCount) {
        state.stage += 1;
        state.usersCompleteAction = 0;
        state.activePosition = 0;
        state.currentUser = state.usersInDeal[0];
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

      const currentUser = state.usersInDeal.find(({ _id }) => _id === payload._id) as IUser;
      currentUser.gameState.action = 'check';
      const nextUser =
        state.activePosition + 1 > state.usersCount - 1 ? 0 : state.activePosition + 1;
      state.currentUser = state.usersInDeal[nextUser];
      state.activePosition = nextUser;
    },
    betAction: (state, { payload }: { payload: { _id: string; betSize: number } }) => {
      console.log(payload);
      const currentUser = state.usersInDeal.find(({ _id }) => _id === payload._id) as IUser;
      currentUser.gameState.action = 'raise';
      const nextUser =
        state.activePosition + 1 > state.usersCount - 1 ? 0 : state.activePosition + 1;
      state.currentUser = state.usersInDeal[nextUser];
      state.activePosition = nextUser;
      state.bank += payload.betSize;
      state.betToCall = payload.betSize;
      state.usersCompleteAction = 1;
      state.userOptions = ['fold', 'call', 'raise'];
    },
    restartDeal: (state, { payload: deck }: { payload: ICard[] }) => {
      state.isDeal = true;
      state.usersCount += state.wait.length;
      state.board = deck.slice(0, 5);
      state.stage = 0;
      state.activePosition = 0;
      state.showCards = [];
      state.usersInDeal.push(...state.wait);
      const hands = deal(state.usersInDeal.length, deck.slice(5));
      state.usersInDeal.forEach((u, i) => (u.gameState.hand = hands[i])); //here is the same problem - Object is possibly 'null'.ts(2531)
      state.wait = [];
      state.currentUser = state.usersInDeal[0];
    },
  },
});

export const { userSeat, checkAction, restartDeal, betAction } = gameplaySlice.actions;

export default gameplaySlice.reducer;
