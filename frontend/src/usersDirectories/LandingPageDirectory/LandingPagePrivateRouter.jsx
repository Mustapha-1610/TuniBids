import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const LandingPagePrivateRouter = () => {
  const bidderAccount = useSelector((state) => state?.bidderData?.bidderInfo);
  const sellerInfo = useSelector((state) => state.sellerData.sellerInfo);
  if (sellerInfo) {
    return <Navigate to={"/seller/profile"} />;
  } else {
    return bidderAccount ? <Navigate to={"/bidder/"} /> : <Outlet />;
  }
};

export default LandingPagePrivateRouter;
