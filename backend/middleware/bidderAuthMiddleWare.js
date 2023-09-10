import jwt from "jsonwebtoken";
import Bidder from "../Models/UserEntities/Bidder.js";
import asyncHandler from "express-async-handler";

const protectBidderRoutes = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.bidder = await Bidder.findById(decoded.bidderId);
    next();
  } catch (error) {
    return res.status(401).json({ Error: "Invalid Token" });
  }
});

export { protectBidderRoutes };
