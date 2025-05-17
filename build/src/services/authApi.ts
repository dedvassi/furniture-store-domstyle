import { apiSlice } from './api';
import { User, UserCreate } from '../types/user';
import { LoginRequest, LoginResponse } from '../types/auth';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: {
          username: credentials.email,
          password: credentials.password,
        },
      }),
    }),
    register: builder.mutation<User, UserCreate>({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    getCurrentUser: builder.query<User, void>({
      query: () => '/users/me',
      providesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCurrentUserQuery,
} = authApiSlice;
