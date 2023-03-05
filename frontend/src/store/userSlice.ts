import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { connectSocket } from 'socket';
import { IUser, INewUser, IUserState, IUserGamestate } from '../types/interfaces';
import { START_BANKROLL } from '../utils/constants';
import { seatOutUserThunk, seatUserThunk, userSeat, userSeatOut } from './gameplaySlice';

const initialState: IUserState = {
  user: null,
  // user: {
  //   _id: String(Date.now()),
  //   nickname: 'Guest',
  //   bankroll: START_BANKROLL,
  //   gameState: {
  //     hand: [],
  //     stack: START_BANKROLL,
  //     state: 'wait',
  //     bet: 0,
  //     roundBets: 0,
  //     action: false,
  //     bestCombination: [],
  //     restBestCards: [],
  //     combinationRating: 0,
  //   },
  // },
  status: null,
  error: null,
};

export const registerUserThunk = createAsyncThunk(
  'userSlice/registerUserThunk',
  async (user: INewUser, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error('sth went wrong');
      }
      const data = await response.json();
      const userData = {
        _id: data._id,
        nickname: user.nickname,
        bankroll: data.bankroll,
        gameState: {
          hand: [],
          stack: 0,
          state: 'wait',
          bet: 0,
          roundBets: 0,
          action: false,
          bestCombination: [],
          restBestCards: [],
          combinationRating: 0,
        },
      };
      dispatch(registerUser(userData));
      // connectSocket(userData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  'userSlice/loginUserThunk',
  async (user: INewUser, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('http://localhost:8000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        throw new Error('loginUserThunk sth went wrong');
      }
      const data = await response.json();
      const userData = {
        _id: data._id,
        nickname: user.nickname,
        bankroll: data.bankroll,
        gameState: {
          hand: [],
          stack: 0,
          state: 'wait',
          bet: 0,
          roundBets: 0,
          action: false,
          bestCombination: [],
          restBestCards: [],
          combinationRating: 0,
        },
      };
      dispatch(registerUser(userData));
      // connectSocket(userData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    registerUser: (state, { payload }: { payload: IUser }) => {
      state.user = payload;
    },
    setUserGamestate: (state, { payload }: { payload: IUserGamestate }) => {
      if (state.user) {
        state.user.gameState = payload;
      }
    },
    upBalance: (state) => {
      if (state.user) {
        state.user.bankroll += START_BANKROLL;
        state.user.gameState.stack += START_BANKROLL;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserThunk.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(registerUserThunk.fulfilled, (state) => {
      state.status = 'fulfilled';
      state.error = null;
    });
    builder.addCase(registerUserThunk.rejected, (state) => {
      state.status = 'rejected';
      state.error = 'User already Exist';
    });
    builder.addCase(loginUserThunk.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loginUserThunk.fulfilled, (state) => {
      state.status = 'fulfilled';
      state.error = null;
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.status = 'rejected';
      state.error = 'Invalid login or password';
    });
    builder.addCase(userSeat, (state, action) => {
      if (state.user && state.user._id === action.payload._id) {
        state.user.gameState.stack = state.user.bankroll;
        state.user.bankroll = 0;
      }
    });
    builder.addCase(seatOutUserThunk.fulfilled, (state, action) => {
      if (state.user && state.user._id === action.payload._id) {
        state.user.bankroll = action.payload.gameState.stack;
        state.user.gameState.stack = 0;
      }
    });
  },
});

export const { registerUser, setUserGamestate, upBalance } = userSlice.actions;

export default userSlice.reducer;
