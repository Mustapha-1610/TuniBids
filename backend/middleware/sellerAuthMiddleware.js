import jwt from "jsonwebtoken";
import Seller from "../Models/UserEntities/Seller.js";
import asyncHandler from "express-async-handler";

const protectSellerRoutes = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.seller = await Seller.findById(decoded.sellerId);
    next();
  } catch (error) {
    return res.status(401).json({ Error: "Invalid Token" });
  }
});

export { protectSellerRoutes };
