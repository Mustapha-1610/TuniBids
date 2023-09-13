import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
const BidderPrivateRoute = () => {
  const socket = io("http://localhost:5000/bidder");
  const bidderAccount = useSelector(
    (state) => state?.bidderData?.bidderInfo?.BidderAccount
  );

  if (bidderAccount) {
    socket.emit("userConnected", bidderAccount?._id);
  }
  return bidderAccount ? <Outlet /> : <Navigate to={"/index/login"} />;
};

export default BidderPrivateRoute;
