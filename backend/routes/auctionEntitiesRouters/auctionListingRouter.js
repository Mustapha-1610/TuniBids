import expreess from "express";
import * as auctionListingController from "../../Controller/AuctionEntitiesController/AuctionListingController.js";
import { protectSellerRoutes } from "../../middleware/sellerAuthMiddleware.js";
const auctionListingRouter = expreess.Router();

auctionListingRouter
  .route("/create")
  .post(protectSellerRoutes, auctionListingController.CreateAuctionListing);

export default auctionListingRouter;
