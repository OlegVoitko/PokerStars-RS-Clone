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

const toNextStage = (state: IGameplay) => {
  switch (state.stage) {
    case 1:
      state.showCards.push(...state.board.slice(0, 3));
      state.betToCall = 0;
      break;
    case 2:
      state.showCards.push(state.board[3]);
      state.betToCall = 0;
      break;
    case 3:
      state.showCards.push(state.board[4]);
      state.betToCall = 0;
      break;
    case 4: {
      state.bank = 0;
      state.betToCall = 0;
      state.showCards = [{ cardFace: 'SHOWDOWN', value: 0, suit: '' }];
      break;
    }
    case 100: {
      state.bank = 0;
      state.betToCall = 0;
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

export const callActionThunk = createAsyncThunk(
  'game/callAction',
  async (data: { _id: string; callSize: number }) => {
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
      state.wait.push(payload);
    },
    checkAction: (state, { payload }: { payload: { _id: string } }) => {
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
      const nextUser =
        state.activePosition + 1 > state.usersCount - 1 ? 0 : state.activePosition + 1;
      state.currentUser = state.usersInDeal[nextUser];
      state.activePosition = nextUser;
      state.bank += payload.betSize;
      state.betToCall += payload.betSize;
      state.usersCompleteAction = 1;
      state.userOptions = ['fold', 'call', 'raise'];
    },
    foldAction: (state, { payload }: { payload: { _id: string } }) => {
      const currentUser = state.usersInDeal.find(({ _id }) => _id === payload._id) as IUser;
      if (state.usersCompleteAction === state.usersCount - 1) {
        state.stage += 1;
        state.usersCompleteAction = 0;
        state.activePosition = 0;
        state.currentUser = state.usersInDeal[0];
        state.usersInDeal.forEach((u) => (u.gameState.bet = 0));
        state.usersCount -= 1;
        state.usersInDeal = state.usersInDeal.filter((u) => u._id !== payload._id);
        state.wait.push(currentUser);
        toNextStage(state);
        return;
      }
      // const currentUser = state.usersInDeal.find(({ _id }) => _id === payload._id) as IUser;
      currentUser.gameState.action = 'fold';
      state.wait.push(currentUser);
      const nextUser =
        state.activePosition + 1 > state.usersCount - 1 ? 0 : state.activePosition + 1;
      state.currentUser = state.usersInDeal[nextUser];
      state.usersCount -= 1;
      state.usersInDeal = state.usersInDeal.filter((u) => u._id !== payload._id);
      //TODO add win message + restart game
      if (state.usersInDeal.length === 1) {
        console.log(`winner is ${state.usersInDeal[0]._id}`);
        state.stage = 100;
        toNextStage(state);
      }
    },
    callAction: (state, { payload }: { payload: { _id: string; callSize: number } }) => {
      const { _id, callSize } = payload;
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
    restartDeal: (state, { payload: deck }: { payload: ICard[] }) => {
      state.isDeal = true;
      // state.usersCount += state.wait.length;
      state.usersCount = state.usersInDeal.length;
      state.board = deck.slice(0, 5);
      state.stage = 0;
      state.activePosition = 0;
      state.showCards = [];
      state.usersInDeal.push(...state.wait);
      const hands = deal(state.usersInDeal.length, deck.slice(5));
      state.usersInDeal.forEach((u, i) => (u.gameState.hand = hands[i]));
      state.wait = [];
      state.currentUser = state.usersInDeal[0];
    },
  },
});

export const { userSeat, checkAction, restartDeal, betAction, callAction, foldAction } =
  gameplaySlice.actions;

export default gameplaySlice.reducer;
