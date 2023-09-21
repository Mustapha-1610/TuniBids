import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminGetActiveBiddersMutation } from "../../../../Slices/usersApiSlice";
import { useAdminLockBiddersMutation } from "../../../../Slices/usersApiSlice";
const ActiveBiddersDashboard = () => {
  const [activeBidders, { isLoading }] = useAdminGetActiveBiddersMutation();
  const [lockBidder] = useAdminLockBiddersMutation();
  const [bidders, setBidders] = useState([]);
  const [isRefreshed, setIsRefreshed] = useState(false);

  const getActiveBidders = async () => {
    const res = await activeBidders();
    setBidders(res?.data?.bidders);
  };

  const lockBidderAccount = async (e, bidderId) => {
    e.preventDefault();
    const res = await lockBidder({ bidderId });
    console.log(res);
    setIsRefreshed(!isRefreshed);
  };

  const navigate = useNavigate();

  useEffect(() => {
    getActiveBidders();
  }, [isRefreshed]);

  return (
    <>
      <h1>component</h1>
      {bidders?.length === 0 ? (
        "There Are No Current Disabled Bidder Accounts"
      ) : (
        <>
          {bidders?.map((item, index) => {
            return (
              <div key={index}>
                <img src={item?.ProfilePicture} alt="Loading" />
                <br />
                FullName : {item?.Name} {item?.Surname}
                <br />
                Email : {item?.Email}
                <br></br>
                PhoneNumber : {item?.PhoneNumber}
                <br />
                Full Adress : {item?.FullAdress}
                <br />
                Number Of Participated Auctions :{" "}
                {item?.ParticipatedAuction?.Finiched.length +
                  item?.ParticipatedAuction?.OnGoing.length}
                <br />
                Number Of Auctions Won :{" "}
                {item?.ParticipatedAuction?.AuctionWon.length}
                <br />
                <button
                  type="button"
                  onClick={(e) => lockBidderAccount(e, item?._id)}
                >
                  Lock Account
                </button>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default ActiveBiddersDashboard;
