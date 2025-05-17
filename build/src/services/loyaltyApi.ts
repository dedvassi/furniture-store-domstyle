import { apiSlice } from './api';
import { LoyaltyAccount, LoyaltyTransaction, LoyaltyReward } from '../types/loyalty';

export const loyaltyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLoyaltyAccount: builder.query<LoyaltyAccount, void>({
      query: () => '/loyalty/account',
      providesTags: ['Loyalty'],
    }),
    getLoyaltyTransactions: builder.query<LoyaltyTransaction[], { skip?: number; limit?: number }>({
      query: ({ skip = 0, limit = 20 }) => `/loyalty/transactions?skip=${skip}&limit=${limit}`,
      providesTags: ['Loyalty'],
    }),
    getLoyaltyRewards: builder.query<LoyaltyReward[], void>({
      query: () => '/loyalty/rewards',
      providesTags: ['Loyalty'],
    }),
    redeemReward: builder.mutation<void, number>({
      query: (rewardId) => ({
        url: `/loyalty/rewards/${rewardId}/redeem`,
        method: 'POST',
      }),
      invalidatesTags: ['Loyalty'],
    }),
  }),
});

export const {
  useGetLoyaltyAccountQuery,
  useGetLoyaltyTransactionsQuery,
  useGetLoyaltyRewardsQuery,
  useRedeemRewardMutation,
} = loyaltyApiSlice;
