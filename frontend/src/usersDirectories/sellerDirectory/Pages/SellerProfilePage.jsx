import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const SellerProfilePage = () => {
  const sellerInfo = useSelector((state) => state.sellerData.sellerInfo);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(sellerInfo);
  }, [sellerInfo]);

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
      }}
    >
      <img
        src={sellerInfo.BusinessLogo}
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          display: "block",
          margin: "auto",
        }}
      />
      <br />
      <h2 style={{ color: "#444" }}>{sellerInfo.BusinessName}</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <p style={{ width: "50%" }}>
          <strong>Email : </strong>
          {sellerInfo.Email}
        </p>
        <p style={{ width: "50%" }}>
          <strong>Phone Number : </strong>
          {sellerInfo.PhoneNumber}
        </p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <p style={{ width: "50%" }}>
          <strong>City : </strong>
          {sellerInfo.City}
        </p>
        <p style={{ width: "50%" }}>
          <strong>State : </strong>
          {sellerInfo.State}
        </p>
      </div>
      <p style={{ width: "100%" }}>
        <strong>Full Location : </strong>
        {sellerInfo.FullLocation}
      </p>
      <p style={{ width: "100%" }}>
        <strong>Rating :</strong> {sellerInfo.Rating}
      </p>
      <button
        style={{
          backgroundColor: "#00A36C",
          color: "#fff",
          cursor: "pointer",
        }}
        onClick={() => navigate("/seller/edit")}
      >
        Edit Personal Informations
      </button>
    </div>
  );
};

export default SellerProfilePage;
