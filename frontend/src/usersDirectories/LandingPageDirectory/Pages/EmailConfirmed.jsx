import React from "react";
import { useNavigate } from "react-router-dom";
const EmailConfirmaed = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>Email Confirmed</h1>
      <button
        onClick={() => {
          navigate("/index/login");
        }}
      >
        Log In
      </button>
    </>
  );
};

export default EmailConfirmaed;
