import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const SellerPrivateRoute = () => {
  const sellerInfo = useSelector((state) => state.sellerData.sellerInfo);

  return sellerInfo ? <Outlet /> : <Navigate to={"/index/seller/login"} />;
};

export default SellerPrivateRoute;
