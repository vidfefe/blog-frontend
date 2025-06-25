import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios";
import { LoginData } from "../../pages/Login";
import { RegisterData } from "../../pages/Registration";
import { RootState } from "../store";
import { UserType } from "../../types";

export interface AuthState {
  data: UserType | null;
  status: "loading" | "loaded" | "error";
}

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (params: LoginData) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
  }
);

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params: RegisterData) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

const initialState: AuthState = {
  data: null,
  status: "loading",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = "loaded";
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = "error";
      })
      .addCase(fetchAuthMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchAuthMe.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const selectIsAuth = (state: RootState) =>
  !!state.auth.data && localStorage.getItem("token");

export const { logout } = authSlice.actions;

export default authSlice.reducer;
