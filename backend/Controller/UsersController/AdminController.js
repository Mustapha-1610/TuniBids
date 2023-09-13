import Admin from "../../Models/UserEntities/Admin.js";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/generateToken.js";
import asyncHandler from "express-async-handler";
import Bidder from "../../Models/UserEntities/Bidder.js";
import Seller from "../../Models/UserEntities/Seller.js";
import { sendSellerConfirmationEmail } from "../../utils/NodeMailerConfig.js";

// Create an admin account
export const createAdmin = asyncHandler(async (req, res, next) => {
  try {
    const { Name, Email, Key } = req.body;

    if (!Name || !Email) {
      res.status(422);
      throw new Error("Invalid Input");
    }
    let newAdmin;
    newAdmin = await Admin.findOne({ Email });

    if (newAdmin) {
      return res.status(400).json({ message: "Admin Exists Allready" });
    }
    const secureKey = bcrypt.hashSync(Key);

    newAdmin = await Admin.create({
      Name,
      Email,
      Key: secureKey,
    });
    generateToken(res, newAdmin._id, newAdmin.userType);
    return res.status(201).json({ newAdmin });
  } catch (err) {
    console.log(err);
    res.status(500);
    console.log(err);
    throw new Error("Server Error");
  }
});

// Login into the admin account
export const adminLogin = asyncHandler(async (req, res, next) => {
  try {
    const { Email, Key } = req.body;

    let existingAdmin = await Admin.findOne({ Email });
    if (!existingAdmin) {
      res.status(400);
      throw new Error("Invalid Inputs !");
    }
    const keyCheck = bcrypt.compareSync(Key, existingAdmin.Key);
    if (!keyCheck) {
      return res.status(400).json({ message: "invalid input" });
    }
    generateToken(res, existingAdmin._id, existingAdmin.userType);
    res.json({
      _id: existingAdmin._id,
      email: existingAdmin.Email,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errorMessage: "Server Error" });
  }
});

//
export const getAdmin = asyncHandler(async (req, res) => {
  let admin = req.admin;
  res.json({
    _id: admin._id,
    email: admin.Email,
  });
});

//
export const getBidders = asyncHandler(async (req, res) => {
  try {
    const activeSellers = await Seller.find({ ValidationStatus: true });
    const sellersAwaitingValidation = await Seller.find({
      ValidationStatus: false,
    });
    const activeBidders = await Bidder.find({ ActivationStatus: true });
    res.json({ activeBidders, sellersAwaitingValidation, activeSellers });
  } catch (error) {
    console.log(error);
    throw new Error("Server Error");
  }
});

//
export const validateSeller = asyncHandler(async (req, res) => {
  try {
    const { AdminId, SellerId } = req.body;
    const admin = await Admin.findById(AdminId);
    let seller = await Seller.findById(SellerId);
    if (!seller || !admin) {
      res.json({ Message: "Server Error Or Invalid Inputs" });
    }
    seller.ValidationStatus = true;
    await seller.save();
    sendSellerConfirmationEmail(seller.BusinessName, seller.Email);
    return res.json({ Message: "Seller Verified" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Server Error" });
  }
});
