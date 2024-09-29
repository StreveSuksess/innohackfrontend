import { IProject, ITask } from "@/types/projectTypes.ts";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  projects: IProject[];
}

const initialState: IInitialState = {
  projects: [],
};

export const ProjectsSLice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{
        name: string;
        id: string;
        projectId: string;
        deskId: string;
        status: string;
        start: string | null;
        end: string | null;
        description: string;
      }>
    ) => {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === action.payload.projectId
      );
      console.log(current(state.projects));
      console.log(action.payload.projectId);
      const deskIndex = state.projects[projectIndex].desks.findIndex(
        (desk) => desk.id === action.payload.deskId
      );

      state.projects[projectIndex].desks[deskIndex].tasks.push({
        id: action.payload.id,
        name: action.payload.name,
        status: action.payload.status,
        start: action.payload.start,
        end: action.payload.end,
        description: action.payload.description,
      });
    },
    deleteTask: (
      state,
      action: PayloadAction<{
        projectId: string;
        deskId: string;
        taskId: string;
      }>
    ) => {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === action.payload.projectId
      );
      const deskIndex = state.projects[projectIndex].desks.findIndex(
        (desk) => desk.id === action.payload.deskId
      );

      state.projects[projectIndex].desks[deskIndex].tasks = state.projects[
        projectIndex
      ].desks[deskIndex].tasks.filter(
        (task) => task.id !== action.payload.taskId
      );
    },
    updateTask: (
      state,
      action: PayloadAction<{
        name: string;
        taskId: string;
        projectId: string;
        deskId: string;
        status: string;
      }>
    ) => {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === action.payload.projectId
      );
      const deskIndex = state.projects[projectIndex].desks.findIndex(
        (desk) => desk.id === action.payload.deskId
      );
      const taskIndex = state.projects[projectIndex].desks[
        deskIndex
      ].tasks.findIndex((task) => task.id === action.payload.taskId);

      state.projects[projectIndex].desks[deskIndex].tasks[taskIndex] = {
        ...state.projects[projectIndex].desks[deskIndex].tasks[taskIndex],
        name: action.payload.name,
        status: action.payload.status,
      };
    },
    addDesk: (
      state,
      action: PayloadAction<{ name: string; id: string; projectId: string }>
    ) => {
      state.projects[
        state.projects.findIndex(
          (project) => project.id === action.payload.projectId
        )
        //@ts-ignore
      ].desks.push({
        id: action.payload.id,
        title: action.payload.name,
        tasks: [],
      });
    },
    deleteDesk: (
      state,
      action: PayloadAction<{ deskId: string; projectId: string }>
    ) => {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === action.payload.projectId
      );

      state.projects[projectIndex].desks.splice(
        state.projects[projectIndex].desks.findIndex(
          (desk) => desk.id === action.payload.deskId
        ),
        1
      );
    },
    editDeskName: (
      state,
      action: PayloadAction<{
        newName: string;
        deskId: string;
        projectId: string;
      }>
    ) => {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === action.payload.projectId
      );
      const deskIndex = state.projects[projectIndex].desks.findIndex(
        (desk) => desk.id === action.payload.deskId
      );

      state.projects[projectIndex].desks[deskIndex].title =
        action.payload.newName;
    },
    addProject: (
      state,
      action: PayloadAction<{
        projectName: string;
        id: string;
        ownerName: string;
        description: string;
      }>
    ) => {
      state.projects.push({
        id: action.payload.id,
        name: action.payload.projectName,
        members: [],
        owner: action.payload.ownerName,
        desks: [],
        description: action.payload.description,
      });
    },
    deleteProject: (
      state,
      action: PayloadAction<{ deskId: string; projectId: string }>
    ) => {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === action.payload.projectId
      );

      state.projects.splice(projectIndex, 1);
    },
    editProjectName: (
      state,
      action: PayloadAction<{ newProjectSettings: IProject }>
    ) => {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === action.payload.newProjectSettings.id
      );

      state.projects[projectIndex] = action.payload.newProjectSettings;
    },
    setProjects: (state, action: PayloadAction<IInitialState>) => {
      state.projects = action.payload.projects;
    },
    setProject: (
      state,
      action: PayloadAction<{ projectId: string; project: IProject }>
    ) => {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === action.payload.projectId
      );

      state.projects[projectIndex] = action.payload.project;
    },
    setTasks: (
      state,
      action: PayloadAction<{
        projectId: string;
        tasks: ITask[];
        deskId: string;
      }>
    ) => {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === action.payload.projectId
      );
      const deskIndex = state.projects[projectIndex]?.desks.findIndex(
        (desk) => desk.id === action.payload.deskId
      );

      state.projects[projectIndex].desks[deskIndex].tasks =
        action.payload.tasks;
    },
  },
});

export const projectsActions = ProjectsSLice.actions;
export const projectsReducer = ProjectsSLice.reducer;
