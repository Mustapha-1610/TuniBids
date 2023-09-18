import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { useGetLatestAuctionsQuery } from "../../../../Slices/usersApiSlice";
import LatestAuctionListing from "../Components/LatestAuctionListings";
const BidderHomePage = () => {
  const { data, isLoading, isError } = useGetLatestAuctionsQuery();
  const [latestAuctions, setLastestAuctions] = useState(null);
  const bidderAccount = useSelector((state) => state?.bidderData?.bidderInfo);
  useEffect(() => {
    if (data) {
      setLastestAuctions(data);
      console.log(data);
    }
  }, [data]);
  return (
    <>
      {latestAuctions ? (
        <>
          <h2>Latest Auctions</h2>
          {latestAuctions.map((auction, index) => {
            return (
              <React.Fragment key={index}>
                <LatestAuctionListing auction={auction} />;
              </React.Fragment>
            );
          })}
        </>
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default BidderHomePage;
