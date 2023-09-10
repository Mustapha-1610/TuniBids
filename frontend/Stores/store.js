import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../Slices/apiSlice.js";
import { bidderReducer } from "../Slices/authSlice.js";
import { sellerReducer } from "../Slices/authSlice.js";
import { adminReducer } from "../Slices/authSlice.js";
const store = configureStore({
  reducer: {
    bidderData: bidderReducer,
    adminData: adminReducer,
    sellerData: sellerReducer,
    [apiSlice.reducerPath]: apiSlice.reducer, // add bidderApiSlice to the reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  devTools: true,
});

export default store;
