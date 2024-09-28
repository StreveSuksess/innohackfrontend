import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

type InitialState = User | null;

const initialState: InitialState = null;

// @ts-ignore
export const UserSLice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    changePassword: (state, action: PayloadAction<{ newPassword: string }>) => {
      if (state === null) return;
      // @ts-ignore
      state.password = action.payload.newPassword;
    },
    updateProfile: (
      state,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
        dateOfBirth: string;
      }>
    ) => {
      if (state === null) return;
      // @ts-ignore
      state.firstName = action.payload.firstName;
      // @ts-ignore
      state.lastName = action.payload.lastName;
      // @ts-ignore
      state.dateOfBirth = action.payload.dateOfBirth;
    },
    // @ts-ignore
    setUser: (_state, action: PayloadAction<User>) => {
      return { ...action.payload };
    },
  },
});

export const userActions = UserSLice.actions;
export const userReducer = UserSLice.reducer;
