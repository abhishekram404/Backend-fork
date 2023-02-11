import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware]),
});
