import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetAllCompletedAuctionsQuery } from "../../../../Slices/usersApiSlice";
import CompletedAuctions from "../Components/completedAuctions";
const BidderFinichedPage = () => {
  const { data, isLoading, isError } = useGetAllCompletedAuctionsQuery();
  const [completedAuctions, setCompletedAuctions] = useState(null);
  const [errMessage, setErrMessage] = useState(null);
  useEffect(() => {
    if (data?.Message) {
      setErrMessage(data?.Message);
    } else if (data?.completedAuctions) {
      setCompletedAuctions(data?.completedAuctions);
    }
  }, [data]);
  return (
    <>
      {completedAuctions ? (
        <>
          {completedAuctions?.map((item, index) => {
            return <CompletedAuctions key={index} auction={item} />;
          })}
        </>
      ) : (
        <h1>There Are No Current Auction Listings</h1>
      )}
      ;
    </>
  );
};
export default BidderFinichedPage;
