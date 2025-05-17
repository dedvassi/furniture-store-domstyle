import { apiSlice } from './api';
import { Order, OrderCreate, OrderItem } from '../types/order';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => '/orders',
      providesTags: ['Order'],
    }),
    getOrderById: builder.query<Order, number>({
      query: (id) => `/orders/${id}`,
      providesTags: ['Order'],
    }),
    createOrder: builder.mutation<Order, OrderCreate>({
      query: (orderData) => ({
        url: '/orders',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Order'],
    }),
    updateOrderStatus: builder.mutation<Order, { orderId: number; status: string }>({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
} = orderApiSlice;
