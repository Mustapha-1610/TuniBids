import { Routes, Route } from "react-router-dom";
import SellerDashboard from "../Pages/SellerDashboard";
import SellerHeldOngoingPage from "../Pages/SellerHeldOngoingPage";
import SellerHeldFinichedPage from "../Pages/SellerHeldFinichedPage";
import SellerOrdersPage from "../Pages/SellerOrdersPage";
import SellerProfilePage from "../Pages/SellerProfilePage";
import Navbar from "../Components/Navbar";
import SellerPrivateRoute from "./SellerPrivateRoute";
import SellerCreateAuctionPage from "../Pages/SellerCreateAuctionPage";
function SellerInterface() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="" element={<SellerPrivateRoute />}>
          <Route path="/" index element={<SellerDashboard />} />
          <Route path="/ongoing" element={<SellerHeldOngoingPage />} />
          <Route path="/finiched" element={<SellerHeldFinichedPage />} />
          <Route path="/profile" element={<SellerProfilePage />} />
          <Route path="/orders" element={<SellerOrdersPage />}></Route>
          <Route path="/create" element={<SellerCreateAuctionPage />} />
        </Route>
      </Routes>
    </>
  );
}
export default SellerInterface;
