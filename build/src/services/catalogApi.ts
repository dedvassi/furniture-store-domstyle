import { apiSlice } from './api';
import { Product, ProductDetail, Category, CategoryWithChildren } from '../types/catalog';

export const catalogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => '/catalog/categories',
      providesTags: ['Category'],
    }),
    getRootCategories: builder.query<CategoryWithChildren[], void>({
      query: () => '/catalog/categories/root',
      providesTags: ['Category'],
    }),
    getCategoryById: builder.query<CategoryWithChildren, number>({
      query: (id) => `/catalog/categories/${id}`,
      providesTags: ['Category'],
    }),
    getProducts: builder.query<Product[], { skip?: number; limit?: number }>({
      query: ({ skip = 0, limit = 12 }) => `/catalog/products?skip=${skip}&limit=${limit}`,
      providesTags: ['Product'],
    }),
    getProductsByCategory: builder.query<Product[], { categoryId: number; skip?: number; limit?: number }>({
      query: ({ categoryId, skip = 0, limit = 12 }) => 
        `/catalog/categories/${categoryId}/products?skip=${skip}&limit=${limit}`,
      providesTags: ['Product'],
    }),
    getProductById: builder.query<ProductDetail, number>({
      query: (id) => `/catalog/products/${id}`,
      providesTags: ['Product'],
    }),
    getProductBySlug: builder.query<ProductDetail, string>({
      query: (slug) => `/catalog/products/slug/${slug}`,
      providesTags: ['Product'],
    }),
    searchProducts: builder.query<Product[], { query: string; skip?: number; limit?: number }>({
      query: ({ query, skip = 0, limit = 12 }) => 
        `/catalog/products/search?query=${encodeURIComponent(query)}&skip=${skip}&limit=${limit}`,
      providesTags: ['Product'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetRootCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
  useGetProductBySlugQuery,
  useSearchProductsQuery,
} = catalogApiSlice;
