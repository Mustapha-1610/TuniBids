import { apiSlice } from "./apiSlice";
import axios from "axios";
const USERS_URL = "/api/users";
const Admin_URL = "/api/admin";
const Bidder_URL = "/api/bidder";
const Seller_URL = "/api/seller";
const AuctionListing_URL = "/api/auctionlisting";
export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),

    getProfile: builder.query({
      query: () => ({
        url: `${USERS_URL}/profile`,
        method: "GET",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
  }),
});

//
export const biddersApiSlice = apiSlice.injectEndpoints({
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
    bidderActivation: builder.mutation({
      query: (data) => ({
        url: `${Bidder_URL}/activate`,
        method: "PUT",
        body: data,
      }),
    }),
    sendBidderActivationMail: builder.mutation({
      query: (data) => ({
        url: `${Bidder_URL}/sendConfirmationMail`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

//
export const adminApiSlice = apiSlice.injectEndpoints({
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
  }),
});

export const sellerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sellerlogin: builder.mutation({
      query: (data) => ({
        url: `${Seller_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    sellerCreateAuctionListing: builder.mutation({
      query: (data) => ({
        url: `${AuctionListing_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
    sellersignup: builder.mutation({
      query: (data) => ({
        url: `${Seller_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
export const { useAdminloginMutation, useAdmingetbiddersQuery } = adminApiSlice;
export const {
  useBidderloginMutation,
  useBiddersignupMutation,
  useBidderActivationMutation,
  useSendBidderActivationMailMutation,
} = biddersApiSlice;

export const {
  useSellerloginMutation,
  useSellerCreateAuctionListingMutation,
  useSellersignupMutation,
} = sellerApiSlice;
