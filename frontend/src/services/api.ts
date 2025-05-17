import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define base API configuration
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/v1',
    prepareHeaders: (headers, { getState }) => {
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      // If token exists, add authorization header
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      
      return headers;
    },
  }),
  tagTypes: ['User', 'Product', 'Category', 'Order', 'InteriorProject', 'CommunityPost', 'Loyalty'],
  endpoints: (builder) => ({}),
});

// Export hooks for usage in components
export const {} = apiSlice;
