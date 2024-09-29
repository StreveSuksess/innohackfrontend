import { IProject } from "@/types/projectTypes.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      }>
    ) => {
      const projectIndex = state.projects.findIndex(
        (project) => project.id === action.payload.projectId
      );
      const deskIndex = state.projects[projectIndex].desks.findIndex(
        (desk) => desk.id === action.payload.deskId
      );

      state.projects[projectIndex].desks[deskIndex].tasks.push({
        id: action.payload.id,
        name: action.payload.name,
        status: "In progress",
      });
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
        name: action.payload.name,
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

      state.projects[projectIndex].desks[deskIndex].name =
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
  },
});

export const projectsActions = ProjectsSLice.actions;
export const projectsReducer = ProjectsSLice.reducer;
