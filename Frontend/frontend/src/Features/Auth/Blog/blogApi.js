import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    getAllBlogs: builder.query({
      query: (user) => ({
        url: "/",

        method: "GET",
      }),
      providesTags: ["Blog"],
    }),

    addBlogs: builder.mutation({
      // user login ko mutation tya login ko try catch mah poass greko xa tya heresi bujinxa
      query: (val) => ({
        url: "/api/createPost",
        body: val.blog,
        method: "POST",
        headers: {
          " Authorization": val.token,
        },
      }),
      invalidatesTags: ["Blog"],
    }),

    updateBlogs: builder.mutation({
      // user login ko mutation tya login ko try catch mah poass greko xa tya heresi bujinxa
      query: (val) => ({
        url: "/api/post/update",
        body: val.blog,
        method: "PATCH",
        headers: {
          " Authorization": val.token,
        },
      }),
      invalidatesTags: ["Blog"],
    }),
    removeBlogs: builder.mutation({
      // user login ko mutation tya login ko try catch mah poass greko xa tya heresi bujinxa
      query: (val) => ({
        url: "/api/post/remove",
        body: val.blog,
        method: "DELETE",
        headers: {
          " Authorization": val.token,
        },
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

//  export const { getAllBlogs, updateBlogs, removeBlogs, addBlogs } = blogApi;
export const {
  useGetAllBlogsQuery,
  useAddBlogsMutation,
  useRemoveBlogsMutation,
  useUpdateBlogsMutation,
} = blogApi;
