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
    editBidderInformations: builder.mutation({
      query: (data) => ({
        url: `${Bidder_URL}/editInformations`,
        method: "POST",
        body: data,
      }),
    }),
    getLatestAuctions: builder.query({
      query: (data) => ({
        url: `${AuctionListing_URL}/getLatestAuctions`,
      }),
    }),
    getAuction: builder.mutation({
      query: (data) => ({
        url: `${AuctionListing_URL}/getAuction`,
        method: "POST",
        body: data,
      }),
    }),
    AuctionParticipation: builder.mutation({
      query: (data) => ({
        url: `${Bidder_URL}/participate`,
        method: "POST",
        body: data,
      }),
    }),
    AuctionUnparticipation: builder.mutation({
      query: (data) => ({
        url: `${Bidder_URL}/unparticipate`,
        method: "POST",
        body: data,
      }),
    }),
    getAllOnoingAuctions: builder.query({
      query: () => ({
        url: `${AuctionListing_URL}/getOngoingAuctions`,
        method: "GET",
      }),
    }),
    getAllCompletedAuctions: builder.query({
      query: () => ({
        url: `${AuctionListing_URL}/getCompletedAuctions`,
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
    adminGetActiveSellers: builder.mutation({
      query: () => ({
        url: `${Admin_URL}/getActiveSellers`,
        method: "POST",
      }),
      refetchOnMountOrArgChange: true,
      cacheTime: 0,
    }),
    adminGetSellersPendingValidation: builder.mutation({
      query: (data) => ({
        url: `${Admin_URL}/getSellersPendingValidation`,
        method: "POST",
        body: data,
      }),
    }),
    admingValidateSeller: builder.mutation({
      query: (data) => ({
        url: `${Admin_URL}/validateSeller`,
        method: "POST",
        body: data,
      }),
    }),
    adminUnvalidateSeller: builder.mutation({
      query: (data) => ({
        url: `${Admin_URL}/unvalidateSeller`,
        method: "POST",
        body: data,
      }),
    }),
    admingetDisabledSellersAccounts: builder.mutation({
      query: () => ({
        url: `${Admin_URL}/getDisabledSellers`,
        method: "POST",
      }),
    }),
    adminActuallyValidatingTheSellerAcccount: builder.mutation({
      query: (data) => ({
        url: `${Admin_URL}/validateSellerAccount`,
        method: "POST",
        body: data,
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
    editSeller: builder.mutation({
      query: (data) => ({
        url: `${Seller_URL}/edit`,
        method: "POST",
        body: data,
      }),
    }),
    getauctionlistings: builder.mutation({
      query: (data) => ({
        url: `${Seller_URL}/getAuctions`,
        method: "POST",
        body: data,
      }),
    }),
    getCompletedAuctionListings: builder.mutation({
      query: (data) => ({
        url: `${Seller_URL}/getCompletedAuctions`,
        method: "POST",
        body: data,
      }),
    }),
    getUpdatedProfile: builder.query({
      query: () => ({
        url: `${Seller_URL}/getUpdatedPorfile`,
        method: "GET",
      }),
    }),
    getSellerWithId: builder.mutation({
      query: (data) => ({
        url: `${Seller_URL}/getSellerWithId`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = usersApiSlice;
export const {
  useAdminloginMutation,
  useAdmingetbiddersQuery,
  useAdminGetActiveSellersMutation,
  useAdminGetSellersPendingValidationMutation,
  useAdminUnvalidateSellerMutation,
  useAdmingValidateSellerMutation,
  useAdmingetDisabledSellersAccountsMutation,
  useAdminActuallyValidatingTheSellerAcccountMutation,
} = adminApiSlice;
export const {
  useBidderloginMutation,
  useBiddersignupMutation,
  useBidderActivationMutation,
  useSendBidderActivationMailMutation,
  useEditBidderInformationsMutation,
  useGetLatestAuctionsQuery,
  useGetAuctionMutation,
  useAuctionParticipationMutation,
  useAuctionUnparticipationMutation,
  useGetAllOnoingAuctionsQuery,
  useGetAllCompletedAuctionsQuery,
} = biddersApiSlice;

export const {
  useSellerloginMutation,
  useSellerCreateAuctionListingMutation,
  useSellersignupMutation,
  useGetauctionlistingsMutation,
  useGetCompletedAuctionListingsMutation,
  useGetUpdatedProfileQuery,
  useEditSellerMutation,
  useGetSellerWithIdMutation,
} = sellerApiSlice;
