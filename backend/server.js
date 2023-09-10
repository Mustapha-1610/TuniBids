import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import CardRouter from "./routes/CardRouter.js";
import userRouter from "./routes/UserRouter.js";
import adminRouter from "./routes/adminRouter.js";
import bidderRouter from "./routes/userEntitiesRouters/bidderRouter.js";

import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/card", CardRouter);
app.use("/api/admin", adminRouter);
app.use("/api/bidder", bidderRouter);

const port = 5000;
app.listen(port, () => console.log("server started"));
