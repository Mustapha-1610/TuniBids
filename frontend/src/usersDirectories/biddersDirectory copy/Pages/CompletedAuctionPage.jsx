import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAuctionMutation } from "../../../../Slices/usersApiSlice";
import { setBidderCredentials } from "../../../../Slices/authSlice";
import { useAuctionParticipationMutation } from "../../../../Slices/usersApiSlice";
import { useAuctionUnparticipationMutation } from "../../../../Slices/usersApiSlice";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const CompletedAuctionPage = () => {
  const bidderAccount = useSelector((state) => state?.bidderData?.bidderInfo);
  const params = useParams();
  const [getAuction, { isLoading }] = useGetAuctionMutation();
  const auctionId = params?.auctionId;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [auctionParticipation, { isParticipationLoading }] =
    useAuctionParticipationMutation();
  const [auctionUnparticipation, { isUnparticipationLoading }] =
    useAuctionUnparticipationMutation();
  const [participating, setParticipating] = useState(null);
  const [auction, setAuction] = useState(null);
  const [seller, setSeller] = useState(null);
  const [show, setShow] = useState(false);
  const [showUnparticipation, setShowUnparticipation] = useState(false);
  const handleAuctionParticipation = async (e) => {
    const res = await auctionParticipation({ auctionId });
    dispatch(setBidderCredentials({ ...res?.data?.bidder }));
    console.log(res);
  };
  const handelAuctionUnparticipation = async () => {
    const res = await auctionUnparticipation({ auctionId });
    dispatch(setBidderCredentials({ ...res.data.bidder }));
  };
  const handleParticipate = () => {
    setShow(true);
  };

  const handleConfirmParticipation = () => {
    handleAuctionParticipation();

    setShow(false);
  };

  const handleDenyParticipation = () => {
    setShow(false);
  };

  const handleConfirmUnparticipation = () => {
    handelAuctionUnparticipation();
    setShowUnparticipation(false);
  };
  const handleDenyUnparticipation = () => {
    setShowUnparticipation(false);
  };
  const handleUnparticipating = () => {
    setShowUnparticipation(true);
  };
  const getAuctionInfo = async () => {
    if (auctionId) {
      const res = await getAuction({ auctionId });
      setSeller(res.data.seller);
      setAuction(res.data.auction);
      setParticipating(res.data.participating);
      console.log(res);
    }
  };
  useEffect(() => {
    getAuctionInfo();
  }, [auctionId, bidderAccount]);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "20px",
        margin: "20px auto",
        maxWidth: "800px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={auction?.Product?.ProductImage}
          alt="Business Logo"
          style={{ height: "350px", width: "350px", margin: "15px" }}
        />
        <h2>{auction?.Title}</h2>
      </div>
      <div style={{ marginTop: "20px" }}>
        <h4>Held By : {seller?.BusinessName}</h4>
        <br />
        <p>
          <strong> Product Description : </strong>
          {auction?.Product?.ProductDescription}
        </p>
        <p>
          <strong>Start Date : </strong>
          {auction?.Date?.DataStartAuction}
        </p>
        <p>
          <strong>Completion Date : </strong>
          {auction?.Date?.Auctioncompletiondate}
        </p>
        <p>
          <strong>Magasin Price : </strong>
          {auction?.Product?.MagasinPrice}
        </p>
        <p>
          <strong>Winning Pirce : </strong>
          {auction?.Winningprice}
        </p>
        <p>
          <strong>Auction Winner : </strong>
        </p>
        <p>
          <strong>Quanity : </strong> {auction?.Product?.Quantity}
        </p>
      </div>
      <br />
    </div>
  );
};

export default CompletedAuctionPage;
