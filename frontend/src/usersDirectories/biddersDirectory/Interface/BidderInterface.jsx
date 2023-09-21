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
import BidderHistory from "../Pages/BidderHistory";
import AuctionPage from "../Pages/AuctionPage";
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
          <Route path="/history" element={<BidderHistory />} />
          <Route path="/auctionRoom/:roomId" element={<AuctionPage />} />
        </Route>
      </Routes>
    </>
  );
}
export default BidderInterface;
