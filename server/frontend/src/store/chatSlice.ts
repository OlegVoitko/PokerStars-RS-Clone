import { createSlice } from '@reduxjs/toolkit';

export interface IMessage {
  text: string;
  id?: number;
  nickname: string;
  date: Date;
}

export type ChatState = {
  messages: IMessage[];
};

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    addMessage: (state, { payload }: { payload: IMessage }) => {
      state.messages.push(payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
