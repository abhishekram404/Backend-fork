import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    userLogin: builder.mutation({ // user login ko mutation tya login ko try catch mah poass greko xa tya heresi bujinxa
      query: (user) => ({
        url: "/api/userLogin",
        body: user,
        method: "POST",
      }),
    }),
  }),
});

export const {useUserLoginMutation} = authApi;
