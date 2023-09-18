import { Routes, Route } from "react-router-dom";
import BidderHomePage from "../Pages/BidderHomePage";
import BidderProfilePage from "../Pages/bidderProfilePage";
import BidderPrivateRoute from "./BidderPrivateRoute";
import Navbar from "../Components/Navbar";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import AuctionListingParticipationPage from "../Pages/AuctionListingParticipationPage.jsx";
import BidderOngoingPage from "../Pages/BidderOnGoingPage";
import BidderFinichedPage from "../Pages/bidderFinichedPage";
import CompletedAuctionPage from "../Pages/CompletedAuctionPage";
import HowItWorks from "../Pages/bidderHowItWorks";
import BidderEditPersonalInfo from "../Pages/BidderEditPersonalInfo";
function BidderInterface() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="" element={<BidderPrivateRoute />}>
          <Route path="/" index element={<BidderHomePage />} />
          <Route path="/profile" element={<BidderProfilePage />} />
          <Route
            path="/auction/:auctionId"
            element={<AuctionListingParticipationPage />}
          />
          <Route
            path="/completed/:auctionId"
            element={<CompletedAuctionPage />}
          />
          <Route path="/ongoingauctions" element={<BidderOngoingPage />} />
          <Route path="/completedauctions" element={<BidderFinichedPage />} />
          <Route path="/howitworks" element={<HowItWorks />} />
          <Route path="/edit" element={<BidderEditPersonalInfo />} />
        </Route>
      </Routes>
    </>
  );
}
export default BidderInterface;
