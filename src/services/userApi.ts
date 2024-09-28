import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
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
    getUserInfo: builder.query<any, any>({
      query: () => ({
        url: "/me",
        method: "GET",
      }),
    }),
    changePassword: builder.mutation<any, any>({
      query: (body: { oldPassword: string; newPassword: string }) => ({
        url: "/me/change-password",
        method: "POST",
        body: {
          old_password: body.oldPassword,
          new_password: body.newPassword,
        },
      }),
    }),
    updateProfile: builder.mutation<any, any>({
      query: (body: {
        firstName: string;
        lastName: string;
        dateOfBirth: string;
      }) => ({
        url: "/me/update-profile",
        method: "POST",
        body: {
          first_name: body.firstName,
          last_name: body.lastName,
          date_of_birth: body.dateOfBirth,
        },
      }),
    }),
  }),
});

export const {} = userApi;
export default userApi;
