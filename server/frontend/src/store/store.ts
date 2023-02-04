import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import chatReduser from './chatSlice';
import { authApi } from '../services/playerAPI';

const store = configureStore({
  reducer: {
    player: playerReducer,
    chat: chatReduser,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
