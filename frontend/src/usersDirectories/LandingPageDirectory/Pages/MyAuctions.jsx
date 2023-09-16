import React, { useState, useEffect } from "react";
import Completed from "../../sellerDirectory/pages/Completed";
import Ongoing from "../../sellerDirectory/Pages/Ongoing";
import { useSelector } from "react-redux";
const MyAuctions = () => {
  const sellerInfo = useSelector((state) => state.sellerData.sellerInfo);
  const [component, setComponent] = useState(<Ongoing />);
  return (
    <>
      <h1>My Auctions</h1>
      <button
        type="button"
        onClick={() =>
          setComponent(<Ongoing auctionId={sellerInfo.Listings.Ongoing} />)
        }
      >
        Ongoing
      </button>
      <button type="button" onClick={() => setComponent(<Completed />)}>
        Completed
      </button>
      {component}
    </>
  );
};
export default MyAuctions;
