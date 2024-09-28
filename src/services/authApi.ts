import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL + "/auth",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    registration: builder.mutation({
      query: (email) => ({
        url: "/registration",
        method: "POST",
        body: { email },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegistrationMutation } = api;
export default api;
