import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:5000" });

export const adminApiSlice = createApi({
  baseQuery,
  tagTypes: ["Admin"],
  endpoints: (builder) => ({}),
});
