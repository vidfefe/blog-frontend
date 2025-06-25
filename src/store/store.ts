import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";
import authReducer from "./slices/authSlice";
import toastReducer from "./slices/toastSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
    toast: toastReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
