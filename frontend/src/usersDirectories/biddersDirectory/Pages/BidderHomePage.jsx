import React from "react";
import { useSelector } from "react-redux";
const BidderHomePage = () => {
  const bidderAccount = useSelector(
    (state) => state.bidderData.bidderInfo.BidderAccount
  );
  return (
    <>
      <h1>bidder home page</h1>
      <h1>{bidderAccount.Email}</h1>
    </>
  );
};

export default BidderHomePage;
