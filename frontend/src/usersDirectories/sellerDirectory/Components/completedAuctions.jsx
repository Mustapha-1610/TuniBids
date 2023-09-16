import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetCompletedAuctionListingsMutation } from "../../../../Slices/usersApiSlice";
import "../CSS/ongoingAuctions.css";
import dayjs from "dayjs";
const CompletedAuctions = (props) => {
  const sellerInfo = useSelector((state) => state?.sellerData?.sellerInfo);
  const [getCompletedAuctions, { isLoading }] =
    useGetCompletedAuctionListingsMutation();
  const [auction, setAuctions] = useState(null);
  const [auctionId, setAuctionId] = useState(null);
  const completedAuctions = async () => {
    if (auctionId) {
      const res = await getCompletedAuctions({ auctionId });
      setAuctions(res.data.auction);
    }
  };
  useEffect(() => {
    setAuctionId(props.auctionId);
    if (auctionId) {
      completedAuctions();
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
            Participated Bidders: {auction?.ParticipatedBidders?.length}
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
export default CompletedAuctions;
