import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const BidderPrivateRoute = () => {
  const bidderAccount = useSelector(
    (state) => state?.bidderData?.bidderInfo?.BidderAccount
  );
  return bidderAccount ? <Outlet /> : <Navigate to={"/index/login"} />;
};

export default BidderPrivateRoute;
