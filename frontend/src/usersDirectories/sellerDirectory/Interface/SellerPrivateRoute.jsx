import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const SellerPrivateRoute = () => {
  const sellerInfo = useSelector((state) => state.sellerData.sellerInfo);
  const socket = io("http://localhost:5000/seller", {
    transports: ["websocket"],
  });

  useEffect(() => {
    if (sellerInfo) {
      socket.on("connect", () => {
        socket.emit("sellerConnected", sellerInfo._id);
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [sellerInfo]);

  return sellerInfo ? <Outlet /> : <Navigate to={"/index/seller/login"} />;
};

export default SellerPrivateRoute;
