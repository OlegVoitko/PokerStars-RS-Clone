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
  usersAtTable: [],
  currentUser: null,
  board: [],
  showCards: [],
  bank: 0,
  currentBet: 0,
  userOptions: ['fold', 'call', 'check', 'rais'],
  waitToSeat: [],
  loading: 'idle',
};

const toNextStage = (state: IGameplay) => {
  switch (state.stage) {
    case 1:
      state.showCards.push(...state.board.slice(0, 3));
      state.currentBet = 0;
      break;
    case 2:
      state.showCards.push(state.board[3]);
      state.currentBet = 0;
      break;
    case 3:
      state.showCards.push(state.board[4]);
      state.currentBet = 0;
      break;
    case 4: {
      state.currentBet = 0;
      state.showCards = [{ cardFace: 'SHOWDOWN', value: 0, suit: '' }];
      break;
    }
    case 100: {
      state.currentBet = 0;
      state.showCards = [{ cardFace: 'EXTRA EXIT', value: 0, suit: '' }];
      break;
    }
    default:
      console.log('something went wrong');
  }
};

export const seatUser = createAsyncThunk('game/seatUser', async (user: IUser) => {
  socket.emit('game:seatUser', user);
  return user;
});

export const checkActionFetch = createAsyncThunk('game/checkAction', async () => {
  socket.emit('game:checkAction');
});

export const betActionThunk = createAsyncThunk(
  'game/checkAction',
  async (data: { _id: string; betSize: number }) => {
    socket.emit('game:betAction', data);
    return data;
  }
);

export const callActionThunk = createAsyncThunk(
  'game/callAction',
  async (data: { _id: string }) => {
    socket.emit('game:callAction', data);
    return data;
  }
);

export const foldActionThunk = createAsyncThunk(
  'game/foldAction',
  async (data: { _id: string }) => {
    socket.emit('game:foldAction', data);
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
    userSeat: (state, { payload }: { payload: IUser }) => {
      state.waitToSeat.push(payload);
    },
    checkAction: (state) => {
      state.usersCompleteAction += 1;
      if (state.usersCompleteAction === state.usersCount) {
        state.stage += 1;
        state.usersCompleteAction = 0;
        state.activePosition = 0;
        state.currentUser = state.usersInDeal[0];
        state.usersInDeal.forEach((u) => (u.gameState.bet = 0));
        toNextStage(state);
        return;
      }
      const nextUser =
        state.activePosition + 1 > state.usersCount - 1 ? 0 : state.activePosition + 1;
      state.currentUser = state.usersInDeal[nextUser];
      state.activePosition = nextUser;
    },
    betAction: (state, { payload }: { payload: { _id: string; betSize: number } }) => {
      const currentUser = state.usersInDeal.find(({ _id }) => _id === payload._id) as IUser;
      currentUser.gameState.bet += payload.betSize;
      const nextUser =
        state.activePosition + 1 > state.usersCount - 1 ? 0 : state.activePosition + 1;
      state.currentUser = state.usersInDeal[nextUser];
      state.activePosition = nextUser;
      state.bank += payload.betSize;
      state.currentBet = payload.betSize;
      state.usersCompleteAction = 1;
      state.userOptions = ['fold', 'call', 'raise'];
    },
    callAction: (state, { payload }: { payload: { _id: string } }) => {
      const { _id } = payload;
      const currentUser = state.usersInDeal.find((u) => u._id === _id) as IUser;
      const callSize = state.currentBet - currentUser.gameState.bet;
      currentUser.gameState.bet += callSize;
      state.bank += callSize;
      state.usersCompleteAction += 1;
      if (state.usersCompleteAction === state.usersCount) {
        state.stage += 1;
        state.usersCompleteAction = 0;
        state.activePosition = 0;
        state.currentUser = state.usersInDeal[0];
        state.userOptions = ['fold', 'check', 'call', 'raise'];
        state.usersInDeal.forEach((u) => (u.gameState.bet = 0));
        toNextStage(state);
        return;
      }
      const nextUser =
        state.activePosition + 1 > state.usersCount - 1 ? 0 : state.activePosition + 1;
      state.currentUser = state.usersInDeal[nextUser];
      state.activePosition = nextUser;
    },
    foldAction: (state, { payload }: { payload: { _id: string } }) => {
      state.usersInDeal = state.usersInDeal.filter((u) => u._id !== payload._id);
      if (state.usersCount === 2) {
        state.stage = 100;
        toNextStage(state);
        //TODO add win message + restart game
        return;
      }
      state.usersCount -= 1;
      if (state.usersCompleteAction === state.usersCount) {
        state.stage += 1;
        state.usersCompleteAction = 0;
        state.activePosition = 0;
        state.currentUser = state.usersInDeal[0];
        state.usersInDeal.forEach((u) => (u.gameState.bet = 0));
        toNextStage(state);
        return;
      }

      const newActivePosition = state.activePosition > state.usersCount ? 0 : state.activePosition;
      state.currentUser = state.usersInDeal[newActivePosition];
      state.activePosition = newActivePosition;
    },
    restartDeal: (state, { payload: deck }: { payload: ICard[] }) => {
      state.isDeal = true;
      state.bank = 0;
      state.board = deck.slice(0, 5);
      state.stage = 0;
      state.activePosition = 0;
      state.usersCompleteAction = 0;
      state.showCards = [];
      state.userOptions = ['fold', 'call', 'check', 'rais'];
      state.usersAtTable.push(...state.waitToSeat);
      state.usersInDeal = state.usersAtTable;
      state.usersCount = state.usersInDeal.length;
      const hands = deal(state.usersInDeal.length, deck.slice(5));
      state.usersInDeal.forEach((u, i) => (u.gameState.hand = hands[i]));
      state.waitToSeat = [];
      state.currentUser = state.usersInDeal[0];
    },
  },
});

export const { userSeat, checkAction, restartDeal, betAction, callAction, foldAction } =
  gameplaySlice.actions;

export default gameplaySlice.reducer;