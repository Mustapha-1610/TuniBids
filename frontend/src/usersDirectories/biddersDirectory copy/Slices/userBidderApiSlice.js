import { bidderApiSlice } from "./bidderApiSlice.js";
const Bidder_URL = "/api/bidder";

export const userBidderApiSlice = bidderApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    bidderlogin: builder.mutation({
      query: (data) => ({
        url: `${Bidder_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    biddersignup: builder.mutation({
      query: (data) => ({
        url: `${Bidder_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useBidderloginMutation, useBiddersignupMutation } =
  userBidderApiSlice;
