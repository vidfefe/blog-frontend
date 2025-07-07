import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthState } from "./types/auth";
import { AuthCredentials } from "../modules/auth/types";
import { RootState } from "../app/store";

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthCredentials>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
    },
    clearCredentials(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuth = (state: RootState) =>
  Boolean(state.auth.user && state.auth.token);
export const selectToken = (state: RootState) => state.auth.token;

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
