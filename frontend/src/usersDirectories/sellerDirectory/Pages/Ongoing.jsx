import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import OngoingAuctions from "../Components/ongoingAuctions";
const Ongoing = () => {
  const sellerInfo = useSelector((state) => state.sellerData.sellerInfo);
  return (
    <>
      <h1>Ongoing Auctions</h1>
      {sellerInfo.Listings.Ongoing.map((items, index) => {
        return (
          <div key={index}>
            <OngoingAuctions auctionId={items} />;
          </div>
        );
      })}
    </>
  );
};

export default Ongoing;
