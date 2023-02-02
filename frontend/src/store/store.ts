import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import { authApi } from '../services/playerAPI';

const store = configureStore({
  // export default configureStore({
  reducer: {
    player: playerReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
