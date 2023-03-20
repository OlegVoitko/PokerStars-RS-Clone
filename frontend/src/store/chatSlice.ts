import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { socket } from '../socket';

export interface IMessage {
  text: string;
  id?: number;
  nickname: string;
  date: number;
}

interface ChatState {
  messages: IMessage[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  messages: [],
  loading: 'idle',
} as ChatState;

export const sendMessage = createAsyncThunk('chat/sendMessage', async (message: IMessage) => {
  socket.emit('send', message);
  return message;
});

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, { payload }: { payload: IMessage }) => {
      state.messages.push(payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
