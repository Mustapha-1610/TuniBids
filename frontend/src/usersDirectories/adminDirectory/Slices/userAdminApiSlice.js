import { adminApiSlice } from "../Slices/adminApiSlices.js";
const Admin_URL = "/api/admin";

export const userAdminApiSlice = adminApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminlogin: builder.mutation({
      query: (data) => ({
        url: `${Admin_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    admingetbidders: builder.query({
      query: (data) => ({
        url: `${Admin_URL}/getBidders`,
        method: "GET",
      }),
    }),
    invalidatesTags: ["Admin"],
  }),
});

export const { useAdminloginMutation, useAdmingetbiddersQuery } =
  userAdminApiSlice;
