import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastSeverity } from "../../types";

interface ToastState {
  message: string;
  severity: ToastSeverity;
  open: boolean;
}

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
