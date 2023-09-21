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
import auctionRoomRouter from "./routes/auctionEntitiesRouters/auctionRoomRouter.js";
import auctionListingRouter from "./routes/AuctionEntitiesRouters/auctionListingRouter.js";

import cors from "cors";
import connectDB from "./config/db.js";
import axios from "axios";
dotenv.config();

connectDB();

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://25t95h0z-3000.euw.devtunnels.ms",
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

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
app.use("/api/auctionroom", auctionRoomRouter);

const server = http.createServer(app, (req, res) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:3000",
    "https://25t95h0z-3000.euw.devtunnels.ms",
    "http://localhost:5000/socket.io/?EIO=4&transport=polling&t=OgFzrS"
  );
});
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://25t95h0z-3000.euw.devtunnels.ms",
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

const adminNamespace = io.of("/admin");
const sellerNameSpace = io.of("/seller");
const bidderNameSpace = io.of("/bidder");
const roomTimers = new Map();
bidderNameSpace.on("connection", (socket) => {
  socket.on("userJoined", async (roomId) => {
    try {
      socket.join(roomId);
      await axios.post("http://localhost:5000/api/auctionroom/bidderJoined", {
        auctionRoomId: roomId,
      });
      bidderNameSpace.to(roomId).emit("infoChange");
    } catch (error) {
      console.error("Error making API request:", error);
    }
  });
  socket.on("pushNotifications", ({ bidders, roomId }) => {
    socket.broadcast.emit("recieveNotifications", { bidders, roomId });
    if (!roomTimers.has(roomId)) {
      roomTimers.set(roomId, 300); // Initial timer value (200 seconds)
    }

    const countdown = setInterval(async () => {
      const timerValue = roomTimers.get(roomId);

      if (timerValue <= 0) {
        clearInterval(countdown);
      } else {
        roomTimers.set(roomId, timerValue - 1);
        const updatedTimerValue = roomTimers.get(roomId);

        if (updatedTimerValue <= 0) {
          const res = await axios.post(
            "http://localhost:5000/api/auctionroom/endRoom",
            {
              roomId: roomId,
            }
          );
          bidderNameSpace.to(roomId).emit("endAuctionRoom", res.data.Message);
          clearInterval(countdown);
          clearInterval(countdown);
        } else {
          // Convert the timer value to minutes and seconds format
          const minutes = Math.floor(updatedTimerValue / 60);
          const seconds = updatedTimerValue % 60;
          const timeFormat = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

          bidderNameSpace.to(roomId).emit("updateTimer", timeFormat);
        }
      }
    }, 1000);
  });
  socket.on("userLeftRoom", async () => {
    try {
      await axios.post("http://localhost:5000/api/auctionroom/bidderLeft", {
        auctionRoomId: "650b6d27dc7bc72649ab09bc",
      });
      bidderNameSpace.to("650b6d27dc7bc72649ab09bc").emit("infoChange");
    } catch (error) {
      console.error("Error making API request:", error);
    }
  });
  socket.on("updateRoom", (roomId) => {
    roomTimers.set(roomId, 30);
    bidderNameSpace.to(roomId).emit("infoChange");
  });
});

sellerNameSpace.on("connection", (socket) => {});

// Rest of the code...

const port = 5000;
server.listen(port, () => console.log("Server started"));
