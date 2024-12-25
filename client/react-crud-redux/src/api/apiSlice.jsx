import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
 
export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery(
        {
            baseUrl: import.meta.env.VITE_APP_API_URL,
            prepareHeaders: (headers) => {
                headers.set("X-Binarybox-Api-Key", import.meta.env.VITE_APP_API_KEY)
                return headers;
            },
        },
    ),
    tagTypes: ['Projects'],
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => '/api/projects',
            providesTags: ['Projects']
        }),
        getProject: builder.query({
            query: ({ id }) => `/api/projects/${id}`,
        }),
        addProject: builder.mutation({
            query: (project) => ({
                url: '/api/projects',
                method: 'POST',
                body: project
            }),
            invalidatesTags: ['Projects']
        }),
        updateProject: builder.mutation({
            query: (project) => ({
                url: `/api/projects/${project.id}`,
                method: 'PATCH',
                body: project
            }),
            invalidatesTags: ['Projects']
        }),
        deleteProject: builder.mutation({
            query: ({ id }) => ({
                url: `/api/projects/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Projects']
        }),
    })
})
 
export const {
    useGetProjectsQuery,
    useGetProjectQuery,
    useAddProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation
} = apiSlice