import { Routes, Route } from "react-router-dom";
import SellerDashboard from "../Pages/SellerDashboard";
import SellerOrdersPage from "../Pages/SellerOrdersPage";
import SellerProfilePage from "../Pages/SellerProfilePage";
import Navbar from "../Components/Navbar";
import SellerPrivateRoute from "./SellerPrivateRoute";
import SellerCreateAuctionPage from "../Pages/SellerCreateAuctionPage";
import MyAuctions from "../../LandingPageDirectory/Pages/MyAuctions";
import SellerEditInfoPage from "../Pages/sellerEditInfoPage";
function SellerInterface() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="" element={<SellerPrivateRoute />}>
          <Route path="/" index element={<SellerDashboard />} />
          <Route path="/myauctions" element={<MyAuctions />} />
          <Route path="/profile" element={<SellerProfilePage />} />
          <Route path="/orders" element={<SellerOrdersPage />}></Route>
          <Route path="/create" element={<SellerCreateAuctionPage />} />
          <Route path="/edit" element={<SellerEditInfoPage />} />
        </Route>
      </Routes>
    </>
  );
}
export default SellerInterface;
