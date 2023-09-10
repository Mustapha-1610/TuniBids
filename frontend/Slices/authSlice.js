import { createSlice } from "@reduxjs/toolkit";

//
const biddersInitialState = {
  bidderInfo: localStorage.getItem("bidderInfo")
    ? JSON.parse(localStorage.getItem("bidderInfo"))
    : null,
};

//
const adminInitialState = {
  adminInfo: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo"))
    : null,
};

//
const sellerInitialState = {
  sellerInfo: localStorage.getItem("sellerInfo")
    ? JSON.parse(localStorage.getItem("sellerInfo"))
    : null,
};

const bidderSlice = createSlice({
  name: "bidderData",
  initialState: biddersInitialState,
  reducers: {
    setBidderCredentials: (state, action) => {
      state.bidderInfo = action.payload;
      localStorage.setItem("bidderInfo", JSON.stringify(action.payload));
    },
    bidderLogout: (state, action) => {
      state.bidderInfo = null;
      localStorage.removeItem("bidderInfo");
    },
  },
});

const adminSlice = createSlice({
  name: "adminData",
  initialState: adminInitialState,
  reducers: {
    setAdminCredentials: (state, action) => {
      state.adminInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },
    adminLogout: (state, action) => {
      state.adminInfo = null;
      localStorage.removeItem("adminInfo");
    },
  },
});

const sellerSlice = createSlice({
  name: "sellerData",
  initialState: sellerInitialState,
  reducers: {
    setSellerCredentials: (state, action) => {
      state.sellerInfo = action.payload;
      localStorage.setItem("adminInfo", JSON.stringify(action.payload));
    },
  },
});

export const { setBidderCredentials, bidderLogout } = bidderSlice.actions;
export const { setSellerCredentials } = sellerSlice.actions;
export const { setAdminCredentials, adminLogout } = adminSlice.actions;

export const adminReducer = adminSlice.reducer;
export const sellerReducer = sellerSlice.reducer;
export const bidderReducer = bidderSlice.reducer;
