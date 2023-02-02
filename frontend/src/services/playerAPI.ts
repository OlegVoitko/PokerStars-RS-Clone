import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewUser, Player } from '../types/player';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    // baseUrl: '/'
    baseUrl: 'http://localhost:8000/',
  }),
  endpoints: (build) => ({
    createPlayer: build.mutation<Player, NewUser>({
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
  }),
});

export const { useCreatePlayerMutation } = authApi;
