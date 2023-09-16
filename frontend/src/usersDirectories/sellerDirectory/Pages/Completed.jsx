import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CompletedAuctions from "../Components/completedAuctions";
const Completed = () => {
  const sellerInfo = useSelector((state) => state?.sellerData?.sellerInfo);
  return (
    <>
      <h1>Completed Auctions</h1>
      {sellerInfo.Listings.Finiched.map((items, index) => {
        return (
          <div key={index}>
            <CompletedAuctions auctionId={items} />
          </div>
        );
      })}
    </>
  );
};

export default Completed;
