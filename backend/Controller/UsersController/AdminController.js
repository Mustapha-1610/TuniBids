import Admin from "../../Models/UserEntities/Admin.js";
import bcrypt from "bcryptjs";
import generateToken from "../../utils/generateToken.js";
import asyncHandler from "express-async-handler";
import Bidder from "../../Models/UserEntities/Bidder.js";
import Seller from "../../Models/UserEntities/Seller.js";
import { sendSellerConfirmationEmail } from "../../utils/NodeMailerConfig.js";
import AuctionListing from "../../Models/AuctionEntities/AuctionListing.js";

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
    const SellerId = req.body.sellerId;
    let seller = await Seller.findById(SellerId);
    if (!seller) {
      res.json({ Message: "Server Error Or Invalid Inputs" });
    }
    seller.ActiveStatus = true;
    let promises = [];
    seller.Listings.Ongoing.map((item) => {
      promises.push(AuctionListing.findById(item));
    });

    seller.Listings.Finiched.map((item) => {
      promises.push(AuctionListing.findById(item));
    });

    seller.Listings.PendingApproval.map((item) => {
      promises.push(AuctionListing.findById(item));
    });

    const auctions = await Promise.all(promises);

    for (let auction of auctions) {
      auction.ActivenessStatus = true;
      await auction.save();
    }
    await seller.save();

    return res.json({ Message: "Seller Verified" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Server Error" });
  }
});

//
export const invalidateSeller = asyncHandler(async (req, res) => {
  try {
    const sellerId = req.body.sellerId;
    let seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.json({ Message: "Server Error" });
    }
    let promises = [];
    seller.Listings.Ongoing.map((item) => {
      promises.push(AuctionListing.findById(item));
    });

    seller.Listings.Finiched.map((item) => {
      promises.push(AuctionListing.findById(item));
    });

    seller.Listings.PendingApproval.map((item) => {
      promises.push(AuctionListing.findById(item));
    });

    const auctions = await Promise.all(promises);

    for (let auction of auctions) {
      auction.ActivenessStatus = false;
      await auction.save();
    }
    seller.ActiveStatus = false;
    await seller.save();
    return res.json({ Message: "Account Disabled" });
  } catch (err) {
    console.log(err);
  }
});

//
export const validateSellerAccount = asyncHandler(async (req, res) => {
  let sellerId = req.body.sellerId;
  try {
    let seller = await Seller.findById(sellerId);
    seller.ValidationStatus = true;
    await seller.save();
    sendSellerConfirmationEmail(seller.BusinessName, seller.Email);
    return res.json({ Message: "Seller Validated" });
  } catch (err) {
    console.log(err);
  }
});

//
export const getActiveSellers = asyncHandler(async (req, res) => {
  try {
    const sellers = await Seller.find({
      ValidationStatus: true,
      ActiveStatus: true,
    });
    return res.json({ sellers });
  } catch (err) {
    console.log(err);
    return res.json({ Message: "Server Error" });
  }
});

//
export const getDisabledSellers = asyncHandler(async (req, res) => {
  try {
    let sellers = await Seller.find({ ActiveStatus: false });
    return res.json({ sellers });
  } catch (err) {
    console.log(err);
  }
});

// Function to display all seller accounts who are waiting to be validated
export const getSellersPendingValidation = async (req, res) => {
  try {
    const PendingSellers = await Seller.find({ ValidationStatus: false });
    res.json({ PendingSellers });
  } catch (err) {
    console.log(err);
  }
};

export const getActiveBidders = async (req, res) => {
  try {
    let activeBidders = await Bidder.find({
      ActivationStatus: true,
      ActivenessStatus: true,
    });
    return res.json({ bidders: activeBidders });
  } catch (err) {
    console.log(err);
  }
};

export const getDisabledBidders = async (req, res) => {
  try {
    let disabledBidders = await Bidder.find({
      ActivationStatus: true,
      ActivenessStatus: false,
    });
    return res.json({ bidders: disabledBidders });
  } catch (err) {
    console.log(err);
  }
};

export const unlockBidderAccount = async (req, res) => {
  try {
    const bidderId = req.body.bidderId;
    let bidder = await Bidder.findById(bidderId);
    bidder.ActivenessStatus = true;
    await bidder.save();
    return res.json({ Message: "Bidder Account Unlocked" });
  } catch (ere) {
    console.log(err);
  }
};

export const lockBidderAcccount = async (req, res) => {
  try {
    const bidderId = req.body.bidderId;
    let bidder = await Bidder.findById(bidderId);
    bidder.ActivenessStatus = false;
    await bidder.save();
    return res.json({ Message: "Bidder Account Locked " });
  } catch (err) {
    console.log(err);
  }
};
