import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
const SellerPrivateRoute = () => {
  const socket = io("http://localhost:5000/seller");
  const sellerInfo = useSelector((state) => state.sellerData.sellerInfo);
  if (sellerInfo) {
    socket.emit("sellerConnected", sellerInfo._id);
  }
  return sellerInfo ? <Outlet /> : <Navigate to={"/index/seller/login"} />;
};

export default SellerPrivateRoute;
