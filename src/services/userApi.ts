import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface User {
  id: string;
  email: string;
  password: string;
  avatarURL: string | null;
  firstName: string | null;
  lastName: string | null;
  birthDate: string | null;
  lastPasswordChange: number;
}

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
    getUserInfo: builder.query<User, any>({
      query: () => ({
        url: "/me/",
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
        url: "/me/change-data",
        method: "PUT",
        body: {
          first_name: body.firstName,
          last_name: body.lastName,
          date_of_birth: body.dateOfBirth,
        },
      }),
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useGetUserInfoQuery,
} = userApi;
export default userApi;
