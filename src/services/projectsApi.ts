import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/me",
  }),
  endpoints: (builder) => ({
    getProjects: builder.query<any, any>({
      query: () => ({
        url: "/project",
        method: "GET",
      }),
    }),
    addProject: builder.mutation<any, any>({
      query: (body: { name: string; description: string }) => ({
        url: "/project",
        method: "POST",
        body: body,
      }),
    }),
    editProject: builder.mutation<any, any>({
      query: (body: {
        name: string;
        description: string;
        project_id: string;
      }) => ({
        url: "/project",
        method: "PUT",
        body: body,
      }),
    }),
    deleteProject: builder.mutation<any, any>({
      query: (body: { project_id: string }) => ({
        url: "/project",
        method: "PUT",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
export default projectsApi;
