import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBidderGetFinicheAuctionsMutation } from "../../../../Slices/usersApiSlice";
import { useSelector } from "react-redux";
const BidderFinichedHistory = () => {
  const [getfiniched] = useBidderGetFinicheAuctionsMutation();
  const [auction, setAuction] = useState([]);
  const getFinichedAuctions = async () => {
    const res = await getfiniched();
    setAuction(res?.data?.Finiched);
  };
  const bidder = useSelector((state) => state?.bidderData?.bidderInfo);
  const navigate = useNavigate();
  useEffect(() => {
    getFinichedAuctions;
  });
  return (
    <>
      <div>
        {auction?.length === 0 ? (
          <h6>No Current Participation In Completed Auctions</h6>
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
                      Participated Bidders: {item?.ParticipatedBidders?.length}{" "}
                      / {item?.MinParticipatedUsers}
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
    </>
  );
};

export default BidderFinichedHistory;
