import { createSlice } from '@reduxjs/toolkit';

export type ChatState = {
  messages: string[];
};

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    addMessage: (state, { payload }: { payload: string }) => {
      state.messages.push(payload);
    },
  },
});

export const { addMessage } = chatSlice.actions;

export default chatSlice.reducer;
