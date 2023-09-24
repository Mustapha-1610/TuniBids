import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
const TestPage = () => {
  const bidderAccount = useSelector(
    (state) => state.bidderData.bidderInfo.BidderAccount
  );

  useEffect(() => {});
  const [text, setText] = useState("");
  const [Hello, setHello] = useState("");
  return (
    <>
      <h1> Hello {bidderAccount.Name}</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <h1>{Hello}</h1>
      <button>Click</button>
    </>
  );
};

export default TestPage;
