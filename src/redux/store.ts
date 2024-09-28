import { projectsReducer } from "@/redux/slices/ProjectSlice.ts";
import authApi from "@/services/authApi.ts";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
