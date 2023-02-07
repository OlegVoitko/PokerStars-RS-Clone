import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IPlayer, NewUser } from '../types/player';

interface IPlayerState {
  player: IPlayer | null;
  status: string | null;
  error: string | null;
}

const initialState: IPlayerState = {
  player: null,
  status: null,
  error: null,
};

export const registerPlayerThunk = createAsyncThunk(
  'playerSlice/registerPlayerThunk',
  async (player: NewUser, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(player),
      });
      // console.log('createAsyncThunk response', response);
      if (!response.ok) {
        throw new Error('sth went wrong');
      }
      const data = await response.json();
      // console.log('createAsyncThunk data', data);
      dispatch(registerPlayer(data));
    } catch (error) {
      // console.log('createAsyncThunk error', error);
      return rejectWithValue(error);
    }
  }
);

export const loginPlayerThunk = createAsyncThunk(
  'playerSlice/loginPlayerThunk',
  async (player: NewUser, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch('http://localhost:8000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(player),
      });
      // console.log('loginPlayerThunk response', response);
      if (!response.ok) {
        throw new Error('loginPlayerThunk sth went wrong');
      }
      const data = await response.json();
      // console.log('loginPlayerThunk data', data);
      dispatch(registerPlayer(data));
    } catch (error) {
      // console.log('createAsyncThunk error', error);
      return rejectWithValue(error);
    }
  }
);

const playerSlice = createSlice({
  name: 'playerSlice',
  initialState,
  reducers: {
    registerPlayer: (state, { payload }: { payload: IPlayer }) => {
      state.player = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerPlayerThunk.pending, (state, action) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(registerPlayerThunk.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.error = null;
    });
    builder.addCase(registerPlayerThunk.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = 'User already Exist';
    });
    builder.addCase(loginPlayerThunk.pending, (state, action) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loginPlayerThunk.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.error = null;
    });
    builder.addCase(loginPlayerThunk.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = 'Invalid login or password';
    });
  },
});

export const { registerPlayer } = playerSlice.actions;

export default playerSlice.reducer;
