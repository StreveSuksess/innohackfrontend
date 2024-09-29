import { projectsReducer } from "@/redux/slices/ProjectSlice.ts";
import { userReducer } from "@/redux/slices/UserSlice.ts";
import authApi from "@/services/authApi.ts";
import projectsApi from "@/services/projectsApi.ts";
import userApi from "@/services/userApi.ts";
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(projectsApi.middleware)
      .concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
