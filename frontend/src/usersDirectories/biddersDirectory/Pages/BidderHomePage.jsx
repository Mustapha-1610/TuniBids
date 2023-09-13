import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
const BidderHomePage = () => {
  const socket = io("http://localhost:5000");
  const bidderAccount = useSelector(
    (state) => state?.bidderData?.bidderInfo?.BidderAccount
  );

  useEffect(() => {
    socket.emit("test"); // Send "USER CONNECTED" message to the server

    socket.on("message", (msg) => {
      console.log(msg); // Log the received message from the server
    });

    return () => {
      socket.disconnect(); // Disconnect the socket when the component unmounts
    };
  }, []);
  const handleClick = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <h1>bidder home page</h1>
      <h1>{bidderAccount.Email}</h1>
      <button onClick={(e) => handleClick(e)}>Test</button>
    </>
  );
};

export default BidderHomePage;
