import { ITask } from "@/types/projectTypes.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  tasks: ITask[];
}

const initialState: IInitialState = {
  tasks: [],
};

export const ProjectsSLice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action: PayloadAction<{ taskId: string }>) => {
      state.tasks.splice(
        state.tasks.findIndex((task) => task.id === action.payload.taskId),
        1
      );
    },
    editTaskName: (
      state,
      action: PayloadAction<{
        newName: string;
        taskId: string;
      }>
    ) => {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.taskId
      );

      state.tasks[taskIndex].name = action.payload.newName;
    },
    editTaskStatus: (
      state,
      action: PayloadAction<{
        newStatus: string;
        taskId: string;
      }>
    ) => {
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.taskId
      );

      state.tasks[taskIndex].name = action.payload.newStatus;
    },
  },
});

export const projectsActions = ProjectsSLice.actions;
export const projectsReducer = ProjectsSLice.reducer;
