import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminGetDisabledBiddersMutation } from "../../../../Slices/usersApiSlice";
import { useAdminUnlockBiddersMutation } from "../../../../Slices/usersApiSlice";
const DisabledBiddersAccounts = () => {
  const [getBidders, { isLoading }] = useAdminGetDisabledBiddersMutation();
  const [unlockBidder] = useAdminUnlockBiddersMutation();
  const [bidders, setBidders] = useState([]);
  const [isRefreshed, setIsRefreshed] = useState(false);
  const getDisabledBidders = async () => {
    const res = await getBidders();
    setBidders(res?.data?.bidders);
  };
  const unlockBidderAccounts = async (e, bidderId) => {
    e.preventDefault();
    const res = await unlockBidder({ bidderId });
    setIsRefreshed(!isRefreshed);
  };
  const navigate = useNavigate();
  useEffect(() => {
    getDisabledBidders();
  }, [isRefreshed]);
  return (
    <>
      <h1>Disabled</h1>
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
                  onClick={(e) => unlockBidderAccounts(e, item._id)}
                >
                  Unlock Account
                </button>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default DisabledBiddersAccounts;
