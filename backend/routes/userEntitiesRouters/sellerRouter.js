import expreess from "express";
import * as SellerController from "../../Controller/UsersController/SellerController.js";
import { protectSellerRoutes } from "../../middleware/sellerAuthMiddleware.js";
const sellerRouter = expreess.Router();

sellerRouter.post("/create", SellerController.sellerSignup);
sellerRouter.post("/login", SellerController.sellerLogin);
sellerRouter
  .route("/getAuctions")
  .post(protectSellerRoutes, SellerController.getOngoingAuctions);
sellerRouter
  .route("/getCompletedAuctions")
  .post(protectSellerRoutes, SellerController.getCompletedAuctions);
sellerRouter
  .route("/endAuction")
  .post(protectSellerRoutes, SellerController.endAuction);
sellerRouter
  .route("/getUpdatedPorfile")
  .get(protectSellerRoutes, SellerController.getUpdatedProfile);
sellerRouter
  .route("/edit")
  .post(protectSellerRoutes, SellerController.editSeller);

//
sellerRouter.post("/getSellerWithId", SellerController.getSellerWithId);

export default sellerRouter;
