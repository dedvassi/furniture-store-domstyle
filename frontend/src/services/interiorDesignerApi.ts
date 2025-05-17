import { apiSlice } from './api';
import { InteriorProject, InteriorProjectCreate, InteriorItem, InteriorItemCreate } from '../types/interiorDesigner';

export const interiorDesignerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query<InteriorProject[], void>({
      query: () => '/interior-designer/projects',
      providesTags: ['InteriorProject'],
    }),
    getProjectById: builder.query<InteriorProject, number>({
      query: (id) => `/interior-designer/projects/${id}`,
      providesTags: ['InteriorProject'],
    }),
    createProject: builder.mutation<InteriorProject, InteriorProjectCreate>({
      query: (projectData) => ({
        url: '/interior-designer/projects',
        method: 'POST',
        body: projectData,
      }),
      invalidatesTags: ['InteriorProject'],
    }),
    updateProject: builder.mutation<InteriorProject, { projectId: number; projectData: Partial<InteriorProjectCreate> }>({
      query: ({ projectId, projectData }) => ({
        url: `/interior-designer/projects/${projectId}`,
        method: 'PATCH',
        body: projectData,
      }),
      invalidatesTags: ['InteriorProject'],
    }),
    deleteProject: builder.mutation<void, number>({
      query: (id) => ({
        url: `/interior-designer/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['InteriorProject'],
    }),
    addItemToProject: builder.mutation<InteriorItem, { projectId: number; itemData: InteriorItemCreate }>({
      query: ({ projectId, itemData }) => ({
        url: `/interior-designer/projects/${projectId}/items`,
        method: 'POST',
        body: itemData,
      }),
      invalidatesTags: ['InteriorProject'],
    }),
    updateProjectItem: builder.mutation<InteriorItem, { itemId: number; itemData: Partial<InteriorItemCreate> }>({
      query: ({ itemId, itemData }) => ({
        url: `/interior-designer/items/${itemId}`,
        method: 'PATCH',
        body: itemData,
      }),
      invalidatesTags: ['InteriorProject'],
    }),
    removeItemFromProject: builder.mutation<void, number>({
      query: (itemId) => ({
        url: `/interior-designer/items/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['InteriorProject'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useAddItemToProjectMutation,
  useUpdateProjectItemMutation,
  useRemoveItemFromProjectMutation,
} = interiorDesignerApiSlice;
