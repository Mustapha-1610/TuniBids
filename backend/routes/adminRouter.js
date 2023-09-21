import expreess from "express";
import { protect } from "../middleware/adminAuthMiddleware.js";
import * as AdminController from "../Controller/UsersController/AdminController.js";
const adminRouter = expreess.Router();

adminRouter.post("/create", AdminController.createAdmin);
adminRouter.post("/login", AdminController.adminLogin);
adminRouter.get("/getBidders", AdminController.getBidders);
adminRouter.route("/profile").get(protect, AdminController.getAdmin);
adminRouter.route("/validateSeller").post(AdminController.validateSeller);

//
adminRouter.post("/getActiveSellers", AdminController.getActiveSellers);

//
adminRouter.post("/unvalidateSeller", AdminController.invalidateSeller);

//
adminRouter.post("/getDisabledSellers", AdminController.getDisabledSellers);

//
adminRouter.post(
  "/getSellersPendingValidation",
  AdminController.getSellersPendingValidation
);

//
adminRouter.post(
  "/validateSellerAccount",
  AdminController.validateSellerAccount
);

//
adminRouter.post("/getActiveBidders", AdminController.getActiveBidders);

//
adminRouter.post("/getDisabledBidders", AdminController.getDisabledBidders);

//
adminRouter.post("/unlockBidderAccount", AdminController.unlockBidderAccount);

//
adminRouter.post("/lockBidderAccount", AdminController.lockBidderAcccount);
export default adminRouter;
