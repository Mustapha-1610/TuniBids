import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import LandingPageInterface from "./usersDirectories/LandingPageDirectory/LandingPageInterface.jsx";
import AdminInterface from "./usersDirectories/adminDirectory/Interface/AdminInterface.jsx";
import store from "../Stores/store.js";
import adminStore from "../Stores/adminStore.js";
import AdminLoginPage from "./usersDirectories/adminDirectory/Pages/AdminLoginPage.jsx";
import AdminPrivateRoute from "./usersDirectories/adminDirectory/Interface/AdminPrivateRoutes.jsx";
import ActivationPage from "./usersDirectories/LandingPageDirectory/Pages/Activationpage.jsx";
import BidderInterface from "./usersDirectories/biddersDirectory/Interface/BidderInterface.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/index/bidder/Activation/:BidderId/:ActivationCode"
            element={<ActivationPage />}
          />
          <Route path="/index/*" index element={<LandingPageInterface />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/bidder/*" element={<BidderInterface />} />
          <Route path="" element={<AdminPrivateRoute />}>
            <Route path="/admin/*" element={<AdminInterface />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </>
);
