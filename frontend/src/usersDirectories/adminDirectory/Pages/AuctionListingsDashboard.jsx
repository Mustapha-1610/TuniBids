import React, { useState, useEffect } from "react";
import { useGetAllOnoingAuctionsQuery } from "../../../../Slices/usersApiSlice";
import { useAdminStartRoomMutation } from "../../../../Slices/usersApiSlice";
import socket from "../../biddersDirectory/socket";
const AuctionListingsDashboard = () => {
  const [startRoom, { isRoomStarting }] = useAdminStartRoomMutation();
  const { data, isLoading, isError } = useGetAllOnoingAuctionsQuery();
  const [auctions, setAuctions] = useState([]);
  useEffect(() => {
    if (data) {
      setAuctions(data.AllAuctionListing);
      console.log(auctions.length);
    }
  }, [auctions]);
  const handleStartRoom = async (e, auctionId) => {
    const res = await startRoom({ auctionId });
    let bidders = res.data.bidders;
    let roomId = res.data.roomId;
    socket.emit("pushNotifications", { bidders, roomId });
    console.log(res);
  };
  return (
    <>
      {auctions?.length === 0 ? (
        "There Are No Current Ongoing Auctions"
      ) : (
        <>
          {auctions?.map((item, index) => {
            return (
              <div key={index}>
                <h6>{item?.Title}</h6>
                <br />
                <br />
                <button
                  type="button"
                  onClick={(e) => handleStartRoom(e, item?._id)}
                >
                  Start Auction
                </button>
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default AuctionListingsDashboard;
