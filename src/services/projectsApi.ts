import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Creator {
  id: string;
  email: string;
  password: string;
  avatarURL: null;
  firstName: null;
  lastName: null;
  birthDate: null;
  lastPasswordChange: number;
}

interface IProjectResponse {
  id: string;
  name: string;
  description: string;
  creator: Creator;
}

const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/me",
    prepareHeaders: (headers) => {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("Authorization="));

      if (cookie) {
        const token = cookie.split("=")[1];
        headers.set("Authorization", `${token}`);
        headers.set("ngrok-skip-browser-warning", `69420`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProjects: builder.query<{ data: IProjectResponse }, any>({
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
