import expreess from "express";
import * as userController from "../Controller/UserController.js";
import { protect } from "../middleware/authmiddleware.js";
const userRouter = expreess.Router();

userRouter.post("/create", userController.createUser);
userRouter.post("/auth", userController.authUser);
userRouter.post("/logout", userController.logoutUser);
userRouter.route("/profile").get(protect, userController.getUserProfile);

export default userRouter;
