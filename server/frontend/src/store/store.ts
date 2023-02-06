import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import chatReduser from './chatSlice';

const store = configureStore({
  reducer: {
    player: playerReducer,
    chat: chatReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
