import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import chatReduser from './chatSlice';
import gameplayReduser from './gameplaySlice';
// import { gameplayApi } from '../services/gameplayApi';

const store = configureStore({
  // export default configureStore({
  reducer: {
    // [gameplayApi.reducerPath]: gameplayApi.reducer,
    player: playerReducer,
    chat: chatReduser,
    gameplay: gameplayReduser,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gameplayApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
