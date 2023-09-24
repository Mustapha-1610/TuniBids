import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../sellerDirectory/CSS/ongoingAuctions.css";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useBidderGetOngoingAuctionsMutation } from "../../../../Slices/usersApiSlice";
const BidderOngoingHistory = (props) => {
  const [getOngoing] = useBidderGetOngoingAuctionsMutation();
  const [auction, setAuction] = useState([]);
  const navigate = useNavigate();
  const bidder = useSelector((state) => state?.bidderData?.bidderInfo);
  const getOngoingAuctions = async (e) => {
    const res = await getOngoing();
    setAuction(res?.data?.Ongoing);
  };
  useEffect(() => {
    getOngoingAuctions();
  }, []);

  return (
    <div>
      {auction?.length === 0 ? (
        <h6>You Are Currently Not Participating In Any Auction</h6>
      ) : (
        <>
          {auction?.map((item, index) => {
            return (
              <div key={index}>
                <div className="auction-box">
                  <img
                    className="auction-image"
                    src={item?.Product?.ProductImage}
                    alt="Loading"
                  />
                  <br />
                  <br />
                  <strong>{item.Title}</strong>
                  <br />
                  <div>
                    Participated Bidders: {item?.ParticipatedBidders?.length} /{" "}
                    {item?.MinParticipatedUsers}
                  </div>
                  <div>
                    Date Start Auction :{" "}
                    {dayjs(item?.Date?.DataStartAuction).format("YYYY/MM/DD")}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default BidderOngoingHistory;
