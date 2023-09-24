import React, { useEffect, useState } from "react";
import BidderOngoingHistory from "../Components/BidderOngoingHistory";
import BidderFinichedHistory from "../Components/BidderFinichedHistory";
import BidderWonHistory from "../Components/BidderWonHistory";
import { useNavigate } from "react-router-dom";

const BidderHistory = () => {
  const [component, setComponent] = useState(<BidderOngoingHistory />);
  const navigate = useNavigate();
  return (
    <>
      <button
        type="button"
        onClick={() => setComponent(<BidderOngoingHistory />)}
      >
        Ongoing
      </button>
      <button
        type="button"
        onClick={() => setComponent(<BidderFinichedHistory />)}
      >
        Finiched
      </button>
      <button type="button" onClick={() => setComponent(<BidderWonHistory />)}>
        Won
      </button>
      {component}
    </>
  );
};

export default BidderHistory;
