import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';

const store = configureStore({
  // export default configureStore({
  reducer: {
    player: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
