import { ITask } from "@/types/projectTypes.ts";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Creator {
  id: string;
  email: string;
  password: string;
  avatarURL: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  lastPasswordChange: number;
}

interface IProjectResponse {
  id: string;
  name: string;
  description: string;
  creator: Creator;
}

interface IProjectFullResponse {
  id: string;
  name: string;
  description: string;
  creator: Creator;
  desks: Desk[];
  members: ProjectMember[];
}

interface ProjectMember {
  id: string;
  user: Creator;
  project: Omit<IProjectFullResponse, "members" | "desks">;
  role: string;
}

interface Desk {
  id: string;
  tasks: ITask[];
}

const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
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
    getProjects: builder.query<{ data: IProjectResponse[] }, any>({
      query: () => ({
        url: "/me/project",
        method: "GET",
      }),
    }),
    addProject: builder.mutation<any, any>({
      query: (body: { name: string; description: string }) => ({
        url: "/me/project",
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
        url: "/me/project",
        method: "PUT",
        body: body,
      }),
    }),
    deleteProject: builder.mutation<any, any>({
      query: (body: { project_id: string }) => ({
        url: "/me/project",
        method: "PUT",
        body: body,
      }),
    }),
    getProject: builder.query<IProjectFullResponse, any>({
      query: (body: { projectId: string }) => ({
        url: `/project/${body.projectId}`,
        method: "GET",
      }),
    }),
    addDesk: builder.mutation<any, any>({
      query: (body: { projectId: string; name: "string" }) => ({
        url: `/desk/`,
        method: "POST",
        body: body,
      }),
    }),
    deleteDesk: builder.mutation<any, any>({
      query: (body: { deskId: string }) => ({
        url: `/desk`,
        method: "DELETE",
        body: {
          desk_id: body.deskId,
        },
      }),
    }),
    deleteTask: builder.mutation<any, any>({
      query: (body: { taskId: string }) => ({
        url: `/task/`,
        method: "DELETE",
        body: body,
      }),
    }),
    addTask: builder.mutation<any, any>({
      query: (body: {
        name: string;
        description: string;
        deskId: string;
        workerEmail: string;
      }) => ({
        url: `/task/`,
        method: "POST",
        body: body,
      }),
    }),
    updateTask: builder.mutation<any, any>({
      query: (body: {
        name: string;
        description: string;
        taskId: string;
        status: string;
      }) => ({
        url: `/task/`,
        method: "PUT",
        body: { ...body, taskId: body.taskId },
      }),
    }),
    getTask: builder.query<any, any>({
      query: (deskId: string) => ({
        url: `/task/${deskId}`,
        method: "GET",
      }),
    }),
    getProjectHistory: builder.query<any, any>({
      query: (deskId: string) => ({
        url: `/desk/history?desk_id=${deskId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useAddProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
  useGetProjectQuery,
  useAddDeskMutation,
  useDeleteDeskMutation,
  useAddTaskMutation,
  useGetTaskQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useGetProjectHistoryQuery,
} = projectsApi;
export default projectsApi;
