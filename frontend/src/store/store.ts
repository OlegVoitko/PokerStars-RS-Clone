import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import chatReduser from './chatSlice';
import gameplayReduser from './gameplaySlice';
// import { gameplayApi } from '../services/gameplayApi';

const store = configureStore({
  reducer: {
    // [gameplayApi.reducerPath]: gameplayApi.reducer,
    user: userReducer,
    chat: chatReduser,
    gameplay: gameplayReduser,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(gameplayApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
