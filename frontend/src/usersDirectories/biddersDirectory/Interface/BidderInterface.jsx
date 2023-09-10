import { Routes, Route } from "react-router-dom";
import BidderHomePage from "../Pages/bidderHomePage";
import BidderProfilePage from "../Pages/bidderProfilePage";
import BidderPrivateRoute from "./BidderPrivateRoute";
import Navbar from "../Components/Navbar";
function BidderInterface() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="" element={<BidderPrivateRoute />}>
          <Route path="/" index element={<BidderHomePage />} />
          <Route path="/profile" element={<BidderProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}
export default BidderInterface;
