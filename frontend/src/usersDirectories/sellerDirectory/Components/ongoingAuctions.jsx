import React, { useState, useEffect } from "react";
import { useGetauctionlistingsMutation } from "../../../../Slices/usersApiSlice";
import "../CSS/ongoingAuctions.css";
import dayjs from "dayjs";

const OngoingAuctions = (props) => {
  const [getAuctions, { isLoading }] = useGetauctionlistingsMutation();
  const [auctionId, setAuctionId] = useState(null);
  const [auction, setAuction] = useState({});
  const getauctions = async () => {
    const res = await getAuctions({ auctionId });
    setAuction(res.data.auction);
  };
  useEffect(() => {
    setAuctionId(props.auctionId);
    if (auctionId) {
      getauctions(auctionId);
    }
  }, [auctionId]);
  useEffect(() => {}, [auction]);
  return (
    <div className="auction-box-container" style={{ display: "flex" }}>
      {auction ? (
        <div className="auction-box">
          <img
            className="auction-image"
            src={auction?.Product?.ProductImage}
            alt="Loading"
          />
          <br />
          <br />
          <div>Title: {auction.Title}</div>
          <br />
          <div>
            Participated Bidders: {auction?.ParticipatedBidders?.length} /{" "}
            {auction?.MinParticipatedUsers}
          </div>
          <div>
            Date Start Auction :{" "}
            {dayjs(auction?.Date?.DataStartAuction).format("YYYY/MM/DD")}
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default OngoingAuctions;
