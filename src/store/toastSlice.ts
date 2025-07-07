import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ToastState } from "./types/toast";
import { ToastSeverity } from "../shared/types";

const initialState: ToastState = {
  message: "",
  severity: "success",
  open: false,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{ message: string; severity: ToastSeverity }>
    ) => {
      state.open = true;
      state.severity = action.payload.severity;
      state.message = action.payload.message;
    },
    hideToast: (state) => {
      state.open = false;
      state.message = "";
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;
