import { apiSlice } from './api';
import { CommunityPost, CommunityPostCreate, PostComment, PostCommentCreate } from '../types/community';

export const communityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query<CommunityPost[], { skip?: number; limit?: number }>({
      query: ({ skip = 0, limit = 10 }) => `/community/posts?skip=${skip}&limit=${limit}`,
      providesTags: ['CommunityPost'],
    }),
    getPopularPosts: builder.query<CommunityPost[], { skip?: number; limit?: number }>({
      query: ({ skip = 0, limit = 10 }) => `/community/posts/popular?skip=${skip}&limit=${limit}`,
      providesTags: ['CommunityPost'],
    }),
    getPostById: builder.query<CommunityPost, number>({
      query: (id) => `/community/posts/${id}`,
      providesTags: ['CommunityPost'],
    }),
    getUserPosts: builder.query<CommunityPost[], { userId: number; skip?: number; limit?: number }>({
      query: ({ userId, skip = 0, limit = 10 }) => 
        `/community/users/${userId}/posts?skip=${skip}&limit=${limit}`,
      providesTags: ['CommunityPost'],
    }),
    createPost: builder.mutation<CommunityPost, CommunityPostCreate>({
      query: (postData) => ({
        url: '/community/posts',
        method: 'POST',
        body: postData,
      }),
      invalidatesTags: ['CommunityPost'],
    }),
    updatePost: builder.mutation<CommunityPost, { postId: number; postData: Partial<CommunityPostCreate> }>({
      query: ({ postId, postData }) => ({
        url: `/community/posts/${postId}`,
        method: 'PATCH',
        body: postData,
      }),
      invalidatesTags: ['CommunityPost'],
    }),
    deletePost: builder.mutation<void, number>({
      query: (id) => ({
        url: `/community/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CommunityPost'],
    }),
    addComment: builder.mutation<PostComment, { postId: number; commentData: PostCommentCreate }>({
      query: ({ postId, commentData }) => ({
        url: `/community/posts/${postId}/comments`,
        method: 'POST',
        body: commentData,
      }),
      invalidatesTags: ['CommunityPost'],
    }),
    likePost: builder.mutation<void, number>({
      query: (postId) => ({
        url: `/community/posts/${postId}/like`,
        method: 'POST',
      }),
      invalidatesTags: ['CommunityPost'],
    }),
    unlikePost: builder.mutation<void, number>({
      query: (postId) => ({
        url: `/community/posts/${postId}/unlike`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CommunityPost'],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPopularPostsQuery,
  useGetPostByIdQuery,
  useGetUserPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useAddCommentMutation,
  useLikePostMutation,
  useUnlikePostMutation,
} = communityApiSlice;
