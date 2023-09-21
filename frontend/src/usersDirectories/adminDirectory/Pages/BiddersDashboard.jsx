import React, { useState, useEffect } from "react";
import DisabledBiddersAccounts from "../Components/DisableBiddersAccounts";
import ActiveBiddersDashboard from "../Components/activeBiddersDashboad";
const BiddersDashboard = () => {
  const [component, setComponent] = useState(<ActiveBiddersDashboard />);
  return (
    <>
      <button
        type="button"
        onClick={() => setComponent(<ActiveBiddersDashboard />)}
      >
        Active Bidder Accounts
      </button>
      <button
        type="button"
        onClick={() => setComponent(<DisabledBiddersAccounts />)}
      >
        Disabled Bidder Accounts
      </button>
      {component}
    </>
  );
};

export default BiddersDashboard;
