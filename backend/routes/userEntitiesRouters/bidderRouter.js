import expreess from "express";
import * as bidderController from "../../Controller/UsersController/BidderController.js";
import { protectBidderRoutes } from "../../middleware/bidderAuthMiddleWare.js";
const bidderRouter = expreess.Router();

bidderRouter.post("/create", bidderController.createBidder);
bidderRouter.post("/auth", bidderController.authBidder);
bidderRouter.put("/activate", bidderController.verifyBidderAccount);
bidderRouter.post(
  "/sendConfirmationMail",
  bidderController.bidderSendConfirmationEmail
);
bidderRouter
  .route("/getProfile")
  .get(protectBidderRoutes, bidderController.getProfile);
export default bidderRouter;
