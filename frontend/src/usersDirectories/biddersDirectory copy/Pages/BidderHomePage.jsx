import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { useGetLatestAuctionsQuery } from "../../../../Slices/usersApiSlice";
import LatestAuctionListing from "../Components/LatestAuctionListings";
import socket from "../socket";
const BidderHomePage = () => {
  const { data, isLoading, isError } = useGetLatestAuctionsQuery();
  const [latestAuctions, setLastestAuctions] = useState(null);
  const bidderAccount = useSelector((state) => state?.bidderData?.bidderInfo);
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      setLastestAuctions(data);
      console.log(data);
    }
  }, [data]);
  const handleRoomJoin = () => {
    socket.emit("joinAuctionRoom", "65078fc62b92dfb78392dbde");
    navigate("/bidder/auctionpage");
  };
  return (
    <>
      {latestAuctions ? (
        <>
          <h2>Latest Auctions</h2>
          <button onClick={handleRoomJoin}>Click</button>
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
