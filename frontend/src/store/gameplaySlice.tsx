import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { socket } from '../socket';
import { ICard, IUser, IGameplay } from '../types/interfaces';
import { deal, findBestCombination } from '../utils/gameHelper';

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
      const winner = state.usersInDeal[0];
      winner.gameState.stack += state.bank;
      const winerTable = state.usersAtTable.find((u) => u._id === winner._id) as IUser;
      winerTable.gameState.stack += state.bank;
      state.currentBet = 0;
      state.showCards = [
        { cardFace: `${winner.nickname} wins the pot ${state.bank}$`, value: 0, suit: '' },
      ];
      state.bank = 0;
      break;
    }
    default:
      console.log('something went wrong');
  }
};

export const seatUserThunk = createAsyncThunk('game/seatUser', async (user: IUser) => {
  socket.emit('game:seatUser', user);
  return user;
});

export const seatOutUserThunk = createAsyncThunk('game/seatOutUser', async (user: IUser) => {
  socket.emit('game:seatOutUser', user);
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
    userSeatOut: (state, { payload }: { payload: IUser }) => {
      const userInDeal = state.usersInDeal.find((user) => user._id === payload._id);
      const userInWaitToSeat = state.waitToSeat.find((user) => user._id === payload._id);
      if (userInWaitToSeat) {
        state.waitToSeat = state.waitToSeat.filter((user) => user._id !== payload._id);
        return;
      }
      if (!userInDeal) {
        state.usersAtTable = state.usersAtTable.filter((user) => user._id !== payload._id);
        return;
      }
      state.usersAtTable = state.usersAtTable.filter((user) => user._id !== payload._id);
      state.usersInDeal = state.usersAtTable;
      if (state.usersAtTable.length === 0) {
        state.isDeal = false;
      }
      if (state.usersCount === 2) {
        state.currentUser = null;
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
      const currentUserTable = state.usersAtTable.find(({ _id }) => _id === payload._id) as IUser; // To save stack state after restart deal

      currentUserTable.gameState.stack -= payload.betSize;
      currentUser.gameState.stack -= payload.betSize;
      const nextUser =
        state.activePosition + 1 > state.usersCount - 1 ? 0 : state.activePosition + 1;
      state.currentUser = state.usersInDeal[nextUser];
      state.activePosition = nextUser;
      state.bank += payload.betSize;
      state.currentBet = payload.betSize + currentUser.gameState.bet;
      currentUser.gameState.bet += payload.betSize;
      state.usersCompleteAction = 1;
      state.userOptions = ['fold', 'call', 'raise'];
    },
    callAction: (state, { payload }: { payload: { _id: string } }) => {
      const { _id } = payload;
      const currentUser = state.usersInDeal.find((u) => u._id === _id) as IUser;
      const currentUserTable = state.usersAtTable.find(({ _id }) => _id === payload._id) as IUser; // To save stack state after restart deal
      const callSize = state.currentBet - currentUser.gameState.bet;
      currentUser.gameState.bet += callSize;
      currentUser.gameState.stack -= callSize;
      currentUserTable.gameState.stack -= callSize;
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
      state.usersInDeal.forEach((user) => {
        const { bestCombination, restBestCards, combinationRating } = findBestCombination(
          state.board,
          user.gameState.hand
        );
        user.gameState.bestCombination = bestCombination;
        user.gameState.restBestCards = restBestCards;
        user.gameState.combinationRating = combinationRating;
      });
      state.waitToSeat = [];
      state.currentUser = state.usersInDeal[0];
    },
  },
});

export const {
  userSeat,
  userSeatOut,
  checkAction,
  restartDeal,
  betAction,
  callAction,
  foldAction,
} = gameplaySlice.actions;

export default gameplaySlice.reducer;
