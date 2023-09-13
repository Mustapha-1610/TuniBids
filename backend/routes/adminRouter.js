import expreess from "express";
import { protect } from "../middleware/adminAuthMiddleware.js";
import * as AdminController from "../Controller/UsersController/AdminController.js";
const adminRouter = expreess.Router();

adminRouter.post("/create", AdminController.createAdmin);
adminRouter.post("/login", AdminController.adminLogin);
adminRouter.get("/getBidders", AdminController.getBidders);
adminRouter.route("/profile").get(protect, AdminController.getAdmin);
adminRouter
  .route("/validateSeller")
  .post(protect, AdminController.validateSeller);

export default adminRouter;
