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

const AuctionListingPage = () => {
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
        <h3>Held By : {seller?.BusinessName}</h3>
        <p>
          <strong> Product Description : </strong>
          {auction?.Product?.ProductDescription}
        </p>
        <p>
          <strong>Start Date : </strong>
          {auction?.Date?.DataStartAuction}
        </p>
        <p>
          <strong>Magasin Price : </strong>
          {auction?.Product?.MagasinPrice}
        </p>
        <p>
          <strong>Quanity : </strong> {auction?.Product?.Quantity}
        </p>
      </div>
      <br />
      <progress
        value={auction?.ParticipatedBidders?.length}
        max={auction?.MinParticipatedUsers}
        style={{ width: "100%" }}
      ></progress>
      <h7>Auction Room only starts after the bar is fully filled !</h7>
      <div
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        {participating === false ? (
          <button
            type="button"
            onClick={handleParticipate}
            style={{ marginTop: "20px" }}
          >
            {" "}
            Participate
          </button>
        ) : (
          <button
            type="button"
            onClick={handleUnparticipating}
            style={{ marginTop: "20px" }}
          >
            Cancel Participation
          </button>
        )}
      </div>
      <div>
        <Modal
          show={show}
          onHide={handleDenyUnparticipation}
          style={{
            position: "fixed",
            top: "80%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Participation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Do You Confirm Your Participation in the {auction?.Title} Auction ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleConfirmParticipation}>
              Participate
            </Button>
            <Button variant="secondary" onClick={handleDenyParticipation}>
              Deny
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <div>
        <Modal
          show={showUnparticipation}
          onHide={handleDenyUnparticipation}
          style={{
            position: "fixed",
            top: "80%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Unparticipating</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Do You Confirm Your Unparticiption From The {auction?.Title} Auction
            ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleConfirmUnparticipation}>
              Unparticipate
            </Button>
            <Button variant="secondary" onClick={handleDenyUnparticipation}>
              Deny
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AuctionListingPage;
