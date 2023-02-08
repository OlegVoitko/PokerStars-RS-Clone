import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, INewUser, IUserState, IUserGamestate } from '../types/interfaces';
import { START_BANKROLL } from '../utils/constants';
import { betAction, callAction } from './gameplaySlice';

const initialState: IUserState = {
  user: null,
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
      // console.log('createAsyncThunk response', response);
      if (!response.ok) {
        throw new Error('sth went wrong');
      }
      const data = await response.json();
      const userData = {
        _id: data._id,
        nickname: data.nickname,
        password: data.password,
        bankroll: START_BANKROLL,
        gameState: {
          hand: [],
          stack: START_BANKROLL,
          state: 'wait',
          bet: 0,
          action: '',
        },
      };
      // console.log('createAsyncThunk data', data);
      dispatch(registerUser(userData));
    } catch (error) {
      // console.log('createAsyncThunk error', error);
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
      // console.log('loginUserThunk response', response);
      if (!response.ok) {
        throw new Error('loginUserThunk sth went wrong');
      }
      const data = await response.json();
      const userData = {
        _id: data._id,
        nickname: data.nickname,
        password: data.password,
        bankroll: START_BANKROLL,
        gameState: {
          hand: [],
          stack: START_BANKROLL,
          state: 'wait',
          bet: 0,
          action: '',
        },
      };
      // console.log('loginUserThunk data', data);
      dispatch(registerUser(userData));
    } catch (error) {
      // console.log('createAsyncThunk error', error);
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
      // state.user && state.user.gameState = payload;
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
    builder.addCase(callAction, (state, action) => {
      const { callSize } = action.payload;
      if (state.user) state.user.gameState.bet += callSize;
    });
    builder.addCase(betAction, (state, action) => {
      const { betSize } = action.payload;
      if (state.user) state.user.gameState.bet += betSize;
    });
  },
});

export const { registerUser, setUserGamestate } = userSlice.actions;

export default userSlice.reducer;
