import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const BidderProfilePage = () => {
  const bidder = useSelector((state) => state.bidderData.bidderInfo);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(bidder);
  }, [bidder]);

  return (
    <div
      style={{
        width: "150%",
        margin: "auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        maxWidth: "900px",
        marginTop: "100px",
      }}
    >
      <img
        src={bidder?.ProfilePicture}
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          display: "block",
          margin: "auto",
        }}
        alt="loading"
      />
      <br />
      <h2 style={{ color: "#444" }}>
        {bidder?.Name} {bidder?.Surname}
      </h2>
      <br />
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <p style={{ width: "50%" }}>
          <strong>Email : </strong>
          {bidder?.Email}
        </p>
        <p style={{ width: "50%" }}>
          <strong>Phone Number : </strong>
          {bidder?.PhoneNumber}
        </p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <p style={{ width: "50%" }}>
          <strong>City : </strong>
          {bidder?.City}
        </p>
        <p style={{ width: "50%" }}>
          <strong>State : </strong>
          {bidder?.State}
        </p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}></div>
      <p style={{ width: "50%" }}>
        <strong>Full Location : </strong>
        {bidder?.FullAdress}
      </p>
      <div />
      <button
        style={{
          backgroundColor: "#00A36C",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={() => navigate("/bidder/edit")}
      >
        Edit Personal Informations
      </button>
    </div>
  );
};

export default BidderProfilePage;
