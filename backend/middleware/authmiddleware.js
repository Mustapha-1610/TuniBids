import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId);
    next();
  } catch (error) {
    return res.status(401).json({ Error: "Invalid Token" });
  }
});

export { protect };
