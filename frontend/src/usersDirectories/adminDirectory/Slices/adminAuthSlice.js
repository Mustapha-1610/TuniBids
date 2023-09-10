import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminInfo: localStorage.getItem("adminInfo")
    ? JSON.parse(localStorage.getItem("adminInfo"))
    : null,
};

const adminAuthSlice = createSlice({
  name: "adminauth",
  initialState,
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

export const { setAdminCredentials, adminLogout } = adminAuthSlice.actions;

export default adminAuthSlice.reducer;
