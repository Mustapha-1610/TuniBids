import Bidder from "../../Models/UserEntities/Bidder.js";
import Tokens from "../../Models/TokenEntities/Tokens.js";
import generateBidderToken from "../../utils/generateBidderToken.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { sendBidderConfirmationEmail } from "../../utils/NodeMailerConfig.js";
import AuctionListing from "../../Models/AuctionEntities/AuctionListing.js";

// create a bidder account
export const createBidder = asyncHandler(async (req, res, next) => {
  try {
    const {
      Name,
      Surname,
      Email,
      Password,
      State,
      City,
      FullAdress,
      PhoneNumber,
      BirthDate,
    } = req.body;
    if (
      !Name ||
      !Surname ||
      !Email ||
      !Password ||
      !State ||
      !City ||
      !FullAdress ||
      !PhoneNumber ||
      !BirthDate
    ) {
      res.status(422).json({ message: "Missing input" });
    }
    let existingBidder = await Bidder.findOne({
      $or: [{ Email }, { PhoneNumber }],
    });
    if (existingBidder) {
      res.status(400).json({ message: "Account Exists Allready !" });
    }
    const securePassword = bcrypt.hashSync(Password);
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let ActivationCode = "";
    for (let i = 0; i < 25; i++) {
      ActivationCode +=
        characters[Math.floor(Math.random() * characters.length)];
    }
    existingBidder = await Bidder.create({
      Name,
      Surname,
      Email,
      Password: securePassword,
      State,
      City,
      FullAdress,
      PhoneNumber,
      BirthDate,
      ActivationCode,
    });
    sendBidderConfirmationEmail(
      existingBidder.Name,
      existingBidder.Email,
      existingBidder._id,
      existingBidder.ActivationCode
    );
    res.status(201).json({ Message: "Account Created Successfully !" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Message: "Server Error !" });
  }
});

// login into the bidder account
export const authBidder = asyncHandler(async (req, res) => {
  try {
    const { Email, Password, PhoneNumber } = req.body;

    let BidderAccount;
    if ((!Email && !Password) || (!PhoneNumber && !Password)) {
      return res.status(401).json({ Message: "Invalid Input" });
    } else if (!Email) {
      BidderAccount = await Bidder.findOne({ PhoneNumber });
    } else {
      BidderAccount = await Bidder.findOne({ Email });
    }
    if (!BidderAccount) {
      return res.status(404).json({ Message: "Account Dosent Exist" });
    }
    const passwordcheck = bcrypt.compareSync(Password, BidderAccount.Password);
    if (!passwordcheck) {
      return res.status(404).json({ Message: "Invalid email or password !" });
    }
    if (BidderAccount.ActivationStatus === false) {
      return res.status(403).json({
        Message: "You need to verify your email first before logging in !",
        Name: BidderAccount.Name,
        Email: BidderAccount.Email,
        _id: BidderAccount._id,
        ActivationCode: BidderAccount.ActivationCode,
      });
    }
    if (BidderAccount.ActivenessStatus === false) {
      res.status(401).json({ Message: "This Account Is Disabled" });
    }
    generateBidderToken(res, BidderAccount._id);
    return res.json({ bidder: BidderAccount });
  } catch (err) {
    console.log(err);
  }
});

//
export const bidderSendConfirmationEmail = asyncHandler(async (req, res) => {
  try {
    const { Name, Email, _id, ActivationCode } = req.body;
    sendBidderConfirmationEmail(Name, Email, _id, ActivationCode);
    res.status({ Message: "Email Sent" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ Message: "Server Error" });
  }
});

//
export const verifyBidderAccount = async (req, res) => {
  try {
    const { BidderId, ActivationCode } = req.body;
    let VerifiedAccount = await Bidder.findById(BidderId);
    const ActivationTest = (VerifiedAccount.ActivationCode = ActivationCode);
    let Activated;
    if (!ActivationTest) {
      res.json({ Activated: false });
    }
    VerifiedAccount.ActivationStatus = true;
    await VerifiedAccount.save();
    return res.status(200).json({
      Message: "Account verified you can now log in !",
      Activated: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Server Error !" });
  }
};

//
export const getProfile = asyncHandler(async (req, res) => {
  let bidder = await Bidder.findById(req.bidder._id);
  console.log(bidder);
});

export const AuctionParticipation = asyncHandler(async (req, res) => {
  try {
    let bidder = req.bidder;
    let auctionId = req.body.auctionId;
    let auction = await AuctionListing.findById(auctionId);
    auction.ParticipatedBidders.push(bidder._id);
    bidder.ParticipatedAuction.OnGoing.push(auctionId);
    await bidder.save();
    await auction.save();
    return res.json({ bidder: bidder });
  } catch (err) {
    console.log(err);
    return res.json({ Message: "Server Error" });
  }
});

export const AuctionUnparticipating = asyncHandler(async (req, res) => {
  try {
    let bidder = req.bidder;
    let auctionId = req.body.auctionId;
    let auction = await AuctionListing.findById(auctionId);
    const newParticipatingBidders = auction.ParticipatedBidders.filter(
      (_id) => _id.toString() !== bidder._id.toString()
    );
    auction.ParticipatedBidders = newParticipatingBidders;

    const newParticipatedAuctions = bidder.ParticipatedAuction.OnGoing.filter(
      (_id) => _id.toString() !== auctionId.toString()
    );
    bidder.ParticipatedAuction = newParticipatedAuctions;
    await bidder.save();
    await auction.save();
    return res.json({ bidder: bidder });
  } catch (err) {
    console.log(err);
  }
});

export const editBidderInformations = asyncHandler(async (req, res) => {
  try {
    const {
      Name,
      Surname,
      Email,
      ProfilePicture,
      State,
      City,
      FullAdress,
      PhoneNumber,
    } = req.body;
    console.log(Email);

    let bidder;
    if (Email) {
      bidder = await Bidder.findOne({ Email });
      if (bidder) {
        console.log(bidder);
        return res.json({ Message: "Email Exists Allready" });
      }
    }

    bidder = await Bidder.findOne({ PhoneNumber });
    if (bidder) {
      return res.json({
        Message: "Phone Number Allready Used On Another Account !",
      });
    }
    bidder = req.bidder;
    Email ? (bidder.Email = Email) : null;
    Name ? (bidder.Name = Name) : null;
    Surname ? (bidder.Surname = Surname) : null;
    ProfilePicture ? (bidder.ProfilePicture = ProfilePicture) : null;
    State ? (bidder.State = State) : null;
    City ? (bidder.City = City) : null;
    FullAdress ? (bidder.FullAdress = FullAdress) : null;
    await bidder.save();
    return res.json({ bidder: bidder });
  } catch (err) {
    console.log(err);
    return res.json({ Message: "Server Error" });
  }
});
