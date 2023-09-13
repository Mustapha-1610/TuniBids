import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import http from "http";
import { Server } from "socket.io";

import CardRouter from "./routes/CardRouter.js";
import userRouter from "./routes/UserRouter.js";
import adminRouter from "./routes/adminRouter.js";
import bidderRouter from "./routes/userEntitiesRouters/bidderRouter.js";
import sellerRouter from "./routes/userEntitiesRouters/sellerRouter.js";
import auctionListingRouter from "./routes/AuctionEntitiesRouters/auctionListingRouter.js";

import cors from "cors";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/card", CardRouter);
app.use("/api/admin", adminRouter);
app.use("/api/bidder", bidderRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/auctionlisting", auctionListingRouter);

const server = http.createServer(app, (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
});
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

const adminNamespace = io.of("/admin");

adminNamespace.on("connection", (socket) => {
  socket.broadcast.emit("event", "Admin Connected");
});

const bidderNameSpace = io.of("/bidder");
const sellerNameSpace = io.of("/seller");

let users = {};
let connectedSellers = {};

bidderNameSpace.on("connection", (socket) => {
  socket.on("userConnected", (userId) => {
    socket.userId = userId;
    users[userId] = socket;
    console.log(socket.userId + " Connected");
  });
});

sellerNameSpace.on("connection", (socket) => {
  socket.on("sellerConnected", (sellerId) => {
    socket.sellerId = sellerId;
    connectedSellers[sellerId] = socket;
    console.log(sellerId + " Connected");
  });

  socket.on("sellerLoggedOut", (sellerId) => {
    if (sellerId in connectedSellers) {
      delete connectedSellers[sellerId];
      console.log(sellerId + " Disconnected");
    }
  });
});

// Rest of the code...

const port = 5000;
server.listen(port, () => console.log("Server started"));
