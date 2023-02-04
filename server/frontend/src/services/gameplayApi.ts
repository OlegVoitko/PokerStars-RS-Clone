import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IGamePlay, IPlayer } from '../store/gameplaySlice';
import { socket } from '../socket';

export const gameplayApi = createApi({
  reducerPath: 'gameplayApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    addPlayer: builder.mutation<IPlayer, IPlayer>({
      queryFn: (playerData) => {
        return new Promise(() => {
          socket.emit('addPlayer', playerData);
        });
      },
    }),
    updateGameplay: builder.mutation<IGamePlay, IGamePlay>({
      queryFn: (gameplay) => {
        return new Promise(() => {
          socket.emit('updateGameplay', gameplay);
        });
      },
    }),
  }),
});

export const { useAddPlayerMutation, useUpdateGameplayMutation } = gameplayApi;
