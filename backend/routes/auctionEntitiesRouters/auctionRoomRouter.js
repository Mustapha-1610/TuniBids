import expreess from "express";
import * as auctionRoomController from "../../Controller/AuctionEntitiesController/AuctionRoom.js";
import { protectBidderRoutes } from "../../middleware/bidderAuthMiddleWare.js";
const auctionRoomRouter = expreess.Router();

auctionRoomRouter.post("/startRoom", auctionRoomController.startRoom);

auctionRoomRouter.post("/getRoomInfo", auctionRoomController.getRoomInfo);

//
auctionRoomRouter.post("/bidderJoined", auctionRoomController.bidderJoined);

//
auctionRoomRouter.post("/bidderLeft", auctionRoomController.bidderLeft);

//
auctionRoomRouter.post("/endRoom", auctionRoomController.endRoom);

//
auctionRoomRouter
  .route("/updateAuctionRoom")
  .post(protectBidderRoutes, auctionRoomController.updateRoom);

export default auctionRoomRouter;
