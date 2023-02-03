import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import chatReduser from './chatSlice';
import gameplayReduser from './gameplaySlice';

const store = configureStore({
  // export default configureStore({
  reducer: {
    player: playerReducer,
    chat: chatReduser,
    gameplay: gameplayReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
