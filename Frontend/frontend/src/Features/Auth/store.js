import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { blogApi } from "./Blog/blogApi";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware], [blogApi.middleware]),
});
