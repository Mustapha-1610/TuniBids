import { configureStore } from "@reduxjs/toolkit";
import adminAuthReducer from "../src/usersDirectories/adminDirectory/Slices/adminAuthSlice.js";
import { adminApiSlice } from "../src/usersDirectories/adminDirectory/Slices/adminApiSlices";
const adminStore = configureStore({
  reducer: {
    adminAuth: adminAuthReducer,
    [adminApiSlice.reducerPath]: adminApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(adminApiSlice.middleware),
  devTools: true,
});

export default adminStore;
