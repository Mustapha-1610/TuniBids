import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetCompletedAuctionListingsMutation } from "../../../../Slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import "../../sellerDirectory/CSS/ongoingAuctions.css";
import dayjs from "dayjs";
const CompletedAuctions = (props) => {
  const [auction, setAuction] = useState(null);
  const navigate = useNavigate();
  const bidder = useSelector((state) => state?.bidderData?.bidderInfo);
  useEffect(() => {
    if (props.auction) {
      setAuction(props.auction);
      console.log(auction);
    }
  });
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
          <strong>{auction.Title}</strong>
          <br />
          <div>
            Participated Bidders : {auction?.ParticipatedBidders?.length}
          </div>
          <div>
            Auction completion date :{" "}
            {dayjs(auction?.Date?.Auctioncompletiondate).format("YYYY/MM/DD")}
          </div>
          Auction Winnder : {auction?.AuctionWinner}
          <br></br>
          <div>Winning Price : {auction?.WinningPrice}</div>
          {bidder?.ParticipatedAuction?.OnGoing.includes(auction._id) ? (
            <button
              onClick={() => navigate(`/bidder/completed/${auction._id}`)}
              type="button"
            >
              Participated
            </button>
          ) : (
            <button
              onClick={() => navigate(`/bidder/completed/${auction._id}`)}
              type="button"
            >
              Completed
            </button>
          )}
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
};
export default CompletedAuctions;
