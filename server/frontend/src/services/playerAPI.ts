import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewUser, IPlayer } from '../types/player';
// import { ErrorResponse, NewUser, Player } from '../types/player';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/',
  }),
  endpoints: (build) => ({
    createPlayer: build.mutation<IPlayer, NewUser>({
      // createPlayer: build.mutation<Player | ErrorResponse, NewUser>({
      query: (body: NewUser) => ({
        url: `signup`,
        method: 'POST',
        body,
        prepareHeaders: (headers: Headers) => {
          headers.set('Content-Type', 'application/json;charset=utf-8');
          headers.set('Access-Control-Allow-Origin', '*');
          return headers;
        },
      }),
    }),
    checkPlayer: build.mutation<IPlayer, NewUser>({
      query: (body: NewUser) => ({
        url: `signin`,
        method: 'POST',
        body,
        prepareHeaders: (headers: Headers) => {
          headers.set('Content-Type', 'application/json;charset=utf-8');
          return headers;
        },
      }),
    }),
  }),
});

export const { useCreatePlayerMutation, useCheckPlayerMutation } = authApi;
