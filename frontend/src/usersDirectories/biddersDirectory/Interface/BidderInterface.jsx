import { Routes, Route } from "react-router-dom";
import BidderHomePage from "../Pages/BidderHomePage";
import BidderProfilePage from "../Pages/bidderProfilePage";
import BidderPrivateRoute from "./BidderPrivateRoute";
import TestPage from "../Pages/TestPage";
import Navbar from "../Components/Navbar";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
function BidderInterface() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="" element={<BidderPrivateRoute />}>
          <Route path="/" index element={<BidderHomePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/profile" element={<BidderProfilePage />} />
        </Route>
      </Routes>
    </>
  );
}
export default BidderInterface;
