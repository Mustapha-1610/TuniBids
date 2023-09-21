import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useBidderGetAuctionRoomInfoMutation } from "../../../../Slices/usersApiSlice.js";
import { useSelector } from "react-redux";
import socket from "../socket.js";
import { useBidderUpdateAuctionRoomMutation } from "../../../../Slices/usersApiSlice.js";
const AuctionPage = () => {
  const bidderAccount = useSelector((state) => state?.bidderData?.bidderInfo);
  const params = useParams();
  const roomId = params.roomId;
  const [roomInfo] = useBidderGetAuctionRoomInfoMutation();
  const [participants, setParticipants] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [auctionInfo, setAuctionInfo] = useState(null);
  const [ongoingStatus, setOnoingStatus] = useState(null);
  const [Message, setMessage] = useState(null);
  const [newBid, setNewBid] = useState(null);
  const [auctionRoomInfo, setAuctionRoomInfo] = useState(null);
  const [updateRoom] = useBidderUpdateAuctionRoomMutation();
  const getRoomInfo = async () => {
    const res = await roomInfo({ auctionRoomid: roomId });
    if (res.data.Message) {
      setMessage(res.data.Message);
    } else {
      setParticipants(res.data.roomInfo.Participants);
      setAuctionInfo(res?.data?.Auction);
      setAuctionRoomInfo(res.data.roomInfo);
      socket.emit("userJoined", roomId);
    }
  };
  const updateInfo = async () => {
    const res = await roomInfo({ auctionRoomid: roomId });
    console.log(res);
    setParticipants(res.data.roomInfo.Participants);
    setAuctionRoomInfo(res.data.roomInfo);
    console.log(auctionRoomInfo);
  };
  socket.on("infoChange", () => {
    updateInfo();
  });
  socket.on("updateTimer", (newTimerValue) => {
    setRemainingTime(newTimerValue);
  });
  socket.on("endAuctionRoom", (data) => {
    console.log(data);
  });
  useEffect(() => {
    if (roomId) {
      getRoomInfo();
    }
  }, [roomId]);
  const handleBidUpdate = async (e) => {
    e.preventDefault();
    const res = await updateRoom({ roomId: roomId, highestBid: newBid });
    socket.emit("updateRoom", roomId);
    console.log(res);
  };
  return (
    <>
      {Message ? (
        Message
      ) : (
        <>
          <div>
            <h4>Participating Users : {participants}</h4>
            <br></br>
            Remaining Time : {remainingTime}
            <br />
            Highest Bid : {auctionRoomInfo?.HighestBidder?.HighestBid};
            <br />
            Highest Bidder : {auctionRoomInfo?.HighestBidder?.BidderName}
            <br />
            <img src={auctionInfo?.Product?.ProductImage} alt="Loading" />
            <br />
            <br />
            <label>{auctionInfo?.Title}</label>
            <br />
            <h5>{auctionInfo?.Product?.ProductDescription}</h5>
            <br />
            <label>
              <strong>Magasin Price : </strong>{" "}
              {auctionInfo?.Product?.MagasinPrice}
            </label>
          </div>
          <div>
            <input
              type="number"
              placeholder="PlaceBid"
              onChange={(e) => setNewBid(e.target.value)}
            />
            <button type="button" onClick={(e) => handleBidUpdate(e)}>
              Bid
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default AuctionPage;
