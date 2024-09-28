import { projectsReducer } from "@/redux/slices/ProjectSlice.ts";
import { tasksReducer } from "@/redux/slices/TaskSlice.ts";
import authApi from "@/services/authApi.ts";
import projectsApi from "@/services/projectsApi.ts";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    [authApi.reducerPath]: authApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(projectsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
