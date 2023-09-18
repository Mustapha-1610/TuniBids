import { Routes, Route } from "react-router-dom";
import BiddersDashboard from "../Pages/BiddersDashboard.jsx";
import AuctionListingsDashboard from "../Pages/AuctionListingsDashboard.jsx";
import SellersDashboard from "../Pages/SellersDashboard.jsx";
import AdminDashboardPage from "../Pages/AdminDashboardPage.jsx";
import AdminPrivateRoute from "./AdminPrivateRoutes.jsx";
import AdminLoginPage from "../Pages/AdminLoginPage.jsx";
import Navbar from "../Components/Navbar.jsx";
import ActiveSellersDashboard from "../Components/ActiveSellersDashboard.jsx";
import SellersPendingValidationDashboard from "../Components/SellersPendingValidationDashboard.jsx";
import SellerProfilePage from "../Pages/SellerProfilePage.jsx";
function AdminInterface() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" index element={<AdminDashboardPage />} />
        <Route path="/sellers/dashboard" element={<SellersDashboard />} />
        <Route path="/bidders/dashboard" element={<BiddersDashboard />} />
        <Route
          path="/auctionlistings/dashboard"
          element={<AuctionListingsDashboard />}
        />
        <Route path="/seller/:sellerId" element={<SellerProfilePage />} />
      </Routes>
    </>
  );
}
export default AdminInterface;
