import expreess from "express";
import * as bidderController from "../../Controller/UsersController/BidderController.js";
import { protectBidderRoutes } from "../../middleware/bidderAuthMiddleWare.js";
const bidderRouter = expreess.Router();

bidderRouter.post("/create", bidderController.createBidder);
//
bidderRouter.post("/auth", bidderController.authBidder);
//
bidderRouter.put("/activate", bidderController.verifyBidderAccount);
//
bidderRouter.post(
  "/sendConfirmationMail",
  bidderController.bidderSendConfirmationEmail
);
//
bidderRouter
  .route("/getProfile")
  .get(protectBidderRoutes, bidderController.getProfile)
  .post(protectBidderRoutes, bidderController.getProfile);
//
bidderRouter
  .route("/participate")
  .post(protectBidderRoutes, bidderController.AuctionParticipation);
//
bidderRouter
  .route("/unparticipate")
  .post(protectBidderRoutes, bidderController.AuctionUnparticipating);
//
bidderRouter
  .route("/editInformations")
  .post(protectBidderRoutes, bidderController.editBidderInformations);

//
bidderRouter
  .route("/getOngoingAuctions")
  .post(protectBidderRoutes, bidderController.getBidderOngoingAuctions);

//
bidderRouter
  .route("/getFinichedAuctions")
  .post(protectBidderRoutes, bidderController.getBidderFinichedAuctions);

//
bidderRouter
  .route("/getWonAuctions")
  .post(protectBidderRoutes, bidderController.getBidderWonAuctions);

//
bidderRouter
  .route("/sendAuctionRoomStartingNotification")
  .post(
    protectBidderRoutes,
    bidderController.sendAuctionRoomStartingNotification
  );
export default bidderRouter;
