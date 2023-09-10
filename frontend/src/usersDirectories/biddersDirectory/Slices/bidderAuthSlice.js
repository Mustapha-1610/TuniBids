import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bidderInfo: localStorage.getItem("bidderInfo")
    ? JSON.parse(localStorage.getItem("bidderInfo"))
    : null,
};

const bidderAuthSlice = createSlice({
  name: "bidderauth",
  initialState,
  reducers: {
    setBidderCredentials: (state, action) => {
      state.bidderInfo = action.payload;
      localStorage.setItem("bidderInfo", JSON.stringify(action.payload));
    },
  },
});
export const { setBidderCredentials, adminLogout } = bidderAuthSlice.actions;

export default bidderAuthSlice.reducer;
