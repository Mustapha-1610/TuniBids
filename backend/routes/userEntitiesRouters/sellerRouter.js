import expreess from "express";
import * as SellerController from "../../Controller/UsersController/SellerController.js";
import { protectSellerRoutes } from "../../middleware/sellerAuthMiddleware.js";
const sellerRouter = expreess.Router();

sellerRouter.post("/create", SellerController.sellerSignup);
sellerRouter.post("/login", SellerController.sellerLogin);
sellerRouter
  .route("/profile")
  .get(protectSellerRoutes, SellerController.getProfile);

export default sellerRouter;
