import expreess from "express";
import * as auctionListingController from "../../Controller/AuctionEntitiesController/AuctionListingController.js";
import { protectSellerRoutes } from "../../middleware/sellerAuthMiddleware.js";
import { protectBidderRoutes } from "../../middleware/bidderAuthMiddleWare.js";
const auctionListingRouter = expreess.Router();

auctionListingRouter
  .route("/create")
  .post(protectSellerRoutes, auctionListingController.CreateAuctionListing);
auctionListingRouter
  .route("/getLatestAuctions")
  .get(auctionListingController.getLatestAuctions);

auctionListingRouter
  .route("/getAuction")
  .post(protectBidderRoutes, auctionListingController.getAuction);
auctionListingRouter.get(
  "/getOngoingAuctions",
  auctionListingController.getAllOngoingAuction
);

auctionListingRouter.get(
  "/getCompletedAuctions",
  auctionListingController.getAllEndedAuctions
);

auctionListingRouter
  .route("/endAuction")
  .post(protectBidderRoutes, auctionListingController.EndAuction);
export default auctionListingRouter;
