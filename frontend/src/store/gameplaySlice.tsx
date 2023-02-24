import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IRestartDeal, socket } from '../socket';
import { ICard, IUser, IGameplay } from '../types/interfaces';
import { deal, findBestCombination, getWinner } from '../utils/gameHelper';
import { current } from '@reduxjs/toolkit';
import { BLIND_SIZE, SMALL_BLIND_SIZE } from '../utils/constants';

const initialState: IGameplay = {
  stage: 0,
  usersCount: 0,
  usersCompleteAction: 0,
  usersAllin: 0,
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
  indexOfSB: -1,
  winners: null,
};

const cutBlinds = (state: IGameplay) => {
  const stateForSB =
    state.usersInDeal[state.indexOfSB].gameState.stack >= SMALL_BLIND_SIZE
      ? SMALL_BLIND_SIZE
      : state.usersInDeal[state.indexOfSB].gameState.stack;
  state.usersInDeal[state.indexOfSB].gameState.bet += stateForSB;
  state.usersInDeal[state.indexOfSB].gameState.roundBets += stateForSB;
  state.usersInDeal[state.indexOfSB].gameState.stack -= stateForSB;
  state.bank += stateForSB;
  const indexForBB = state.indexOfSB + 1 === state.usersCount ? 0 : state.indexOfSB + 1;
  const stateForBB =
    state.usersInDeal[indexForBB].gameState.stack >= BLIND_SIZE
      ? BLIND_SIZE
      : state.usersInDeal[indexForBB].gameState.stack;
  state.usersInDeal[indexForBB].gameState.bet += stateForBB;
  state.usersInDeal[indexForBB].gameState.roundBets += stateForBB;
  state.usersInDeal[indexForBB].gameState.stack -= stateForBB;
  state.bank += stateForBB;
  state.currentBet = stateForBB;
  state.userOptions = ['fold', 'call', 'raise'];
};

const divideBank = (state: IGameplay) => {
  let candidates = state.usersInDeal;
  let bank = state.bank;
  while (bank || candidates.length) {
    const minBet = Math.min(...candidates.map((w) => w.gameState.roundBets));
    const winsU = getWinner(candidates);
    winsU.forEach((u) => {
      const userInState = state.usersAtTable.find((us) => us._id === u._id);
      if (userInState) {
        userInState.gameState.stack += (minBet * candidates.length) / winsU.length;
      }
    });
    bank -= minBet * candidates.length;
    candidates = candidates.filter((c) => c.gameState.roundBets !== minBet);
    candidates.forEach((c) => (c.gameState.roundBets -= minBet));
  }
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
      state.currentUser = null;
      state.currentBet = 0;
      const winners = getWinner(current(state.usersInDeal));
      state.winners = winners;
      const statesInDeal = state.usersInDeal.map((u) => u.gameState.state);
      if (!statesInDeal.includes('ALLIN')) {
        if (winners.length === 1) {
          const winnerTable = state.usersAtTable.find((u) => u._id === winners[0]._id) as IUser;
          winnerTable.gameState.stack += state.bank;
        } else {
          const winIDs = winners.map((w) => w._id);
          state.usersAtTable.forEach((u) => {
            if (winIDs.includes(u._id)) {
              u.gameState.stack += state.bank / winIDs.length;
            }
          });
        }
        state.bank = 0;
        break;
      }
      divideBank(state);
      state.bank = 0;
      break;
    }
    case 100: {
      state.currentUser = null;
      const winner = state.usersInDeal[0];
      state.winners = [winner];
      if (winner) {
        winner.gameState.stack += state.bank;
        const winnerTable = state.usersAtTable.find((u) => u._id === winner._id) as IUser;
        winnerTable.gameState.stack += state.bank;
      }
      state.currentBet = 0;
      state.bank = 0;
      break;
    }
    case 999: {
      state.currentUser = null;
      state.currentBet = 0;
      const winners = getWinner(current(state.usersInDeal));
      state.winners = winners;
      divideBank(state);
      state.showCards = state.board;
      // state.showCards = [{ cardFace: 'ALLIN', value: 0, suit: '' }];
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

export const restartDealFetch = createAsyncThunk('game/restartDeal', async (data: IRestartDeal) => {
  socket.emit('game:restartDeal', data);
  return data;
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
        // return;
      }
      if (!userInDeal) {
        state.usersAtTable = state.usersAtTable.filter((user) => user._id !== payload._id);
        return;
      }
      state.usersAtTable = state.usersAtTable.filter((user) => user._id !== payload._id);
      state.usersInDeal = state.usersAtTable;
      if (state.usersAtTable.length < 2) {
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
        let nextUser = 0;
        while (state.usersInDeal[nextUser].gameState.state === 'ALLIN') {
          nextUser = nextUser + 1 > state.usersCount - 1 ? 0 : nextUser + 1;
        }
        state.stage += 1;
        state.usersCompleteAction = state.usersAllin;
        // state.activePosition = nextUser;
        // state.currentUser = state.usersInDeal[nextUser];
        state.activePosition = state.indexOfSB;
        state.currentUser = state.usersInDeal[state.indexOfSB];
        state.usersInDeal.forEach((u) => (u.gameState.bet = 0));
        toNextStage(state);
        return;
      }
      let nextUser = state.activePosition + 1 > state.usersCount - 1 ? 0 : state.activePosition + 1;
      while (state.usersInDeal[nextUser].gameState.state === 'ALLIN') {
        nextUser = nextUser + 1 > state.usersCount - 1 ? 0 : nextUser + 1;
      }
      state.currentUser = state.usersInDeal[nextUser];
      state.activePosition = nextUser;
    },
    betAction: (state, { payload }: { payload: { _id: string; betSize: number } }) => {
      state.usersCompleteAction = 1 + state.usersAllin;
      const currentUser = state.usersInDeal.find(({ _id }) => _id === payload._id) as IUser;
      const currentUserTable = state.usersAtTable.find(({ _id }) => _id === payload._id) as IUser; // To save stack state after restart deal

      currentUserTable.gameState.stack -= payload.betSize;
      currentUser.gameState.stack -= payload.betSize;
      let nextUser = state.activePosition + 1 > state.usersCount - 1 ? 0 : state.activePosition + 1;
      while (state.usersInDeal[nextUser].gameState.state === 'ALLIN') {
        nextUser = nextUser + 1 > state.usersCount - 1 ? 0 : nextUser + 1;
      }
      state.currentUser = state.usersInDeal[nextUser];
      state.activePosition = nextUser;
      state.bank += payload.betSize;
      state.currentBet = payload.betSize + currentUser.gameState.bet;
      currentUser.gameState.bet += payload.betSize;
      currentUserTable.gameState.bet += payload.betSize;
      currentUser.gameState.roundBets += payload.betSize;

      state.userOptions = ['fold', 'call', 'raise'];
      if (currentUser.gameState.stack === 0) {
        currentUser.gameState.state = 'ALLIN';
        state.usersAllin += 1;
      }
    },
    callAction: (state, { payload }: { payload: { _id: string } }) => {
      const { _id } = payload;
      const currentUser = state.usersInDeal.find((u) => u._id === _id) as IUser;
      const currentUserTable = state.usersAtTable.find(({ _id }) => _id === payload._id) as IUser; // To save stack state after restart deal
      let callSize = state.currentBet - currentUser.gameState.bet;
      if (callSize >= currentUser.gameState.stack) {
        callSize = currentUser.gameState.stack;
        currentUser.gameState.state = 'ALLIN';
        state.usersAllin += 1;
      }
      currentUserTable.gameState.bet += callSize;
      currentUser.gameState.bet += callSize;
      currentUser.gameState.roundBets += callSize;
      currentUser.gameState.stack -= callSize;
      currentUserTable.gameState.stack -= callSize;
      state.bank += callSize;
      state.usersCompleteAction += 1;
      if (state.usersCount === state.usersAllin) {
        state.stage = 4;
        state.showCards = state.board.slice(0, 5);
        toNextStage(state);
        return;
      }
      if (
        state.usersCount === state.usersCompleteAction &&
        state.usersCompleteAction - 1 === state.usersAllin
      ) {
        state.stage = 4;
        state.showCards = state.board.slice(0, 5);
        toNextStage(state);
        return;
      }
      if (state.usersCompleteAction === state.usersCount) {
        let nextUser = 0;
        while (state.usersInDeal[nextUser].gameState.state === 'ALLIN') {
          nextUser = nextUser + 1 > state.usersCount - 1 ? 0 : nextUser + 1;
        }
        state.stage += 1;
        state.usersCompleteAction = state.usersAllin;
        // state.activePosition = nextUser;
        // state.currentUser = state.usersInDeal[nextUser];
        state.activePosition = state.indexOfSB;
        state.currentUser = state.usersInDeal[state.indexOfSB];
        state.userOptions = ['fold', 'check', 'call', 'raise'];
        state.usersInDeal.forEach((u) => (u.gameState.bet = 0));
        state.usersAtTable.forEach((u) => (u.gameState.bet = 0));
        toNextStage(state);
        return;
      }
      let nextUser = state.activePosition + 1 > state.usersCount - 1 ? 0 : state.activePosition + 1;
      while (state.usersInDeal[nextUser].gameState.state === 'ALLIN') {
        nextUser = nextUser + 1 > state.usersCount - 1 ? 0 : nextUser + 1;
      }
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
        state.userOptions = ['fold', 'check', 'call', 'raise'];
        state.usersCompleteAction = state.usersAllin;
        // state.activePosition = 0; // calculate position when all
        // state.currentUser = state.usersInDeal[0];
        state.activePosition = state.usersInDeal[state.indexOfSB] ? state.indexOfSB : 0;
        state.currentUser = state.usersInDeal[state.activePosition];
        state.usersInDeal.forEach((u) => (u.gameState.bet = 0));
        state.usersAtTable.forEach((u) => (u.gameState.bet = 0));
        toNextStage(state);
        return;
      }

      let nextUser = state.activePosition === state.usersCount ? 0 : state.activePosition;
      while (state.usersInDeal[nextUser].gameState.state === 'ALLIN') {
        nextUser = nextUser + 1 > state.usersCount - 1 ? 0 : nextUser + 1;
      }
      state.currentUser = state.usersInDeal[nextUser];
      state.activePosition = nextUser;
      // state.activePosition = state.usersInDeal[state.indexOfSB] ? state.indexOfSB : 0;
      // state.currentUser = state.usersInDeal[state.activePosition];
    },
    restartDeal: (state, { payload }: { payload: IRestartDeal }) => {
      const { deck, usersAtTable, indexOfSB } = payload;
      state.indexOfSB = indexOfSB + 1;
      state.bank = 0;
      state.stage = 0;
      state.activePosition = 0;
      state.usersCompleteAction = 0;
      state.usersAllin = 0;
      state.winners = null;
      state.userOptions = ['fold', 'call', 'check', 'rais'];
      const ids = usersAtTable.map(({ _id }) => _id);
      state.waitToSeat.forEach((u) => {
        if (!ids.includes(u._id)) {
          usersAtTable.push(u);
        }
      });
      state.usersAtTable = usersAtTable;
      state.usersInDeal = state.usersAtTable.filter((p) => p.gameState.stack > 0);
      if (state.usersInDeal.length < 2) {
        state.isDeal = false;
        state.usersInDeal = [];
        state.usersCount = 0;
        state.currentUser = null;
        state.indexOfSB = -1;
        return;
      }
      state.showCards = [];
      state.isDeal = true;
      state.board = deck.slice(0, 5);

      if (!state.usersInDeal[state.indexOfSB]) state.indexOfSB = 0;

      state.usersCount = state.usersInDeal.length;
      const hands = deal(state.usersInDeal.length, deck.slice(5));
      state.usersInDeal.forEach((u, i) => {
        u.gameState.hand = hands[i];
        u.gameState.state = 'ACTIVE';
        u.gameState.bet = 0;
        u.gameState.roundBets = 0;
      });
      state.usersInDeal.forEach((user) => {
        const { bestCombination, restBestCards, combinationRating } = findBestCombination(
          state.board,
          user.gameState.hand
        );
        user.gameState.bestCombination = bestCombination;
        user.gameState.restBestCards = restBestCards;
        user.gameState.combinationRating = combinationRating;
      });
      // state.waitToSeat = [];
      const indexOfBB = state.usersInDeal[state.indexOfSB + 1] ? state.indexOfSB + 1 : 0;
      state.activePosition = state.usersInDeal[indexOfBB + 1] ? indexOfBB + 1 : 0;
      state.currentUser = state.usersInDeal[state.activePosition];
      cutBlinds(state);
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
