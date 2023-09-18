import React, { useEffect, useState } from "react";
import ActiveSellersDashboard from "../Components/ActiveSellersDashboard";
import SellersPendingValidationDashboard from "../Components/SellersPendingValidationDashboard";
import DisabledSellersPage from "../Components/DisabledSellersPage";
const SellersDashboard = () => {
  const [component, setComponent] = useState(<ActiveSellersDashboard />);
  useEffect(() => {}, [
    component,
    ActiveSellersDashboard,
    SellersPendingValidationDashboard,
  ]);
  return (
    <>
      <h1>SellersDashboard</h1>
      <button
        type="button"
        onClick={() => setComponent(<ActiveSellersDashboard />)}
      >
        Active Sellers
      </button>
      <button
        type="button"
        onClick={() => setComponent(<SellersPendingValidationDashboard />)}
      >
        Sellers Pending Validation
      </button>
      <br />
      <br />
      <button
        type="button"
        onClick={() => setComponent(<DisabledSellersPage />)}
      >
        Disabled Sellers Accounts
      </button>
      <br />
      <br />
      {component}
    </>
  );
};

export default SellersDashboard;
