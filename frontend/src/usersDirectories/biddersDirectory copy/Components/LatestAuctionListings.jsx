import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetCompletedAuctionListingsMutation } from "../../../../Slices/usersApiSlice";
import { useNavigate } from "react-router-dom";
import "../../sellerDirectory/CSS/ongoingAuctions.css";
import dayjs from "dayjs";
const LatestAuctionListing = (props) => {
  const [auction, setAuction] = useState(null);
  const navigate = useNavigate();
  const bidder = useSelector((state) => state?.bidderData?.bidderInfo);
  useEffect(() => {
    if (props.auction) {
      setAuction(props.auction);
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
            Participated Bidders: {auction?.ParticipatedBidders?.length} /{" "}
            {auction?.MinParticipatedUsers}
          </div>
          <div>
            Date Start Auction :{" "}
            {dayjs(auction?.Date?.DataStartAuction).format("YYYY/MM/DD")}
          </div>
          {bidder?.ParticipatedAuction?.OnGoing.includes(auction._id) ? (
            <button
              onClick={() => navigate(`/bidder/auction/${auction._id}`)}
              type="button"
            >
              Participating
            </button>
          ) : (
            <button onClick={() => navigate(`/bidder/auction/${auction._id}`)}>
              Participate
            </button>
          )}
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
};
export default LatestAuctionListing;
