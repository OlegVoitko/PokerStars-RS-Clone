import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, INewUser, IUserState, IUserGamestate } from '../types/interfaces';
import { START_BANKROLL } from '../utils/constants';

const initialState: IUserState = {
  // user: null,
  user: {
    _id: String(Date.now()),
    nickname: 'Guest',
    password: '',
    bankroll: START_BANKROLL,
    gameState: {
      hand: [],
      stack: START_BANKROLL,
      state: 'wait',
      bet: 0,
      action: '',
    },
  },
  status: null,
  error: null,
};

export const registerUserThunk = createAsyncThunk(
  'userSlice/registerUserThunk',
  async (user: INewUser, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('https://pokerstars-allin-rs-clone.onrender.com/signup', {
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
      dispatch(registerUser(userData));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const loginUserThunk = createAsyncThunk(
  'userSlice/loginUserThunk',
  async (user: INewUser, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('https://pokerstars-allin-rs-clone.onrender.com/signin', {
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
  },
});

export const { registerUser, setUserGamestate } = userSlice.actions;

export default userSlice.reducer;
