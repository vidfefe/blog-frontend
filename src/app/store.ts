import { configureStore } from "@reduxjs/toolkit";

import { api } from "../api/api";
import toastReducer from "../store/toastSlice";
import authReducer from "../store/authSlice";

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    auth: authReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
