import User from "../Models/User.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";
export const createUser = async (req, res) => {
  try {
    const { Username, Email, Password } = req.body;
    const user = await User.create({
      Username,
      Email,
      Password,
    });
    if (user) {
      generateToken(res, user._id);
      return res.status(201).json({
        _id: user._id,
        name: user.Username,
        email: user.Email,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ error });
  }
};

export const authUser = asyncHandler(async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({ Email });
    if (user) {
      generateToken(res, user._id);
      res.json({
        _id: user._id,
        name: user.Username,
        email: user.Email,
      });
    } else {
      res.status(401).json({ Error: "Invalid Email Or Password !" });
    }
  } catch (error) {
    res.status(500);
  }
});

export const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const getUserProfile = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user._id);
  res.json({ Email: user.Email, Username: user.Username });
});
