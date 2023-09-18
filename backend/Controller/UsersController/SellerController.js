import Seller from "../../Models/UserEntities/Seller.js";
import Admin from "../../Models/UserEntities/Admin.js";
import bcrypt from "bcryptjs";
import { sendSellerConfirmationEmail } from "../../utils/NodeMailerConfig.js";
import asyncHandler from "express-async-handler";
import generateSellerToken from "../../utils/generateSellerToken.js";
import AuctionListing from "../../Models/AuctionEntities/AuctionListing.js";

// Sign up function with tests on account existance and password encrypting
export const sellerSignup = asyncHandler(async (req, res, next) => {
  try {
    const {
      BusinessName,
      Email,
      Password,
      State,
      City,
      FullLocation,
      PhoneNumber,
      TaxRegistrationCertificate,
      BusinessLicense,
      BusinessLogo,
    } = req.body;
    console.log("HELLOOO");
    if (
      !BusinessName ||
      !Email ||
      !Password ||
      !State ||
      !City ||
      !FullLocation ||
      !PhoneNumber ||
      !TaxRegistrationCertificate ||
      !BusinessLicense ||
      !BusinessLogo
    ) {
      return res.json({ Message: "invalid input" });
    }
    let existingSeller;
    existingSeller = await Seller.findOne({ Email });
    if (existingSeller) {
      return res.json({ message: "Account Exists Allready !" });
    }
    const securePassword = bcrypt.hashSync(Password);
    existingSeller = await Seller.create({
      BusinessName,
      Email,
      Password: securePassword,
      State,
      City,
      FullLocation,
      PhoneNumber,
      TaxRegistrationCertificate,
      BusinessLicense,
      BusinessLogo,
    });
    return res.status(201).json({
      Message:
        "Account Created You Will Be Contacted With An Email Upon Account Verification !",
    });
  } catch (err) {
    console.log(err);
  }
});

// Log in function with tests on existance of the account and the validity and active status of the account
export const sellerLogin = asyncHandler(async (req, res) => {
  const { Email, Password } = req.body;
  let SellerAccount;
  if (!Email || !Password) {
    return res.json({ Message: "Invalid Input" });
  }
  SellerAccount = await Seller.findOne({ Email });
  if (!SellerAccount) {
    return res.json({ Message: "Account Dosent Exist" });
  }
  const passwordcheck = bcrypt.compareSync(Password, SellerAccount.Password);
  if (!passwordcheck) {
    return res.json({ Message: "Invalid email or password !" });
  }
  if (SellerAccount.ActiveStatus == false) {
    return res.json({ Message: "This Account Is Disabled" });
  }
  if (SellerAccount.ValidationStatus == false) {
    return res.json({ Message: "Account Awaiting Validation" });
  }
  generateSellerToken(res, SellerAccount._id);
  return res.json({ SellerAccount });
});

// Function to display all seller accounts who are waiting to be validated
export const SellersPendingValidation = async (req, res) => {
  let PendingSellers;
  try {
    PendingSellers = await Seller.find({ ValidationStatus: false });
    if (PendingSellers.length === 0) {
      return res.json({
        Message: "There are no current sellers pending validation",
      });
    }
    res.status(200).json({ PendingSellers });
  } catch (err) {
    console.log(err);
  }
};

// function to unvalidate and delete a seller account
export const SellerAccountUnvalidating = async (req, res) => {
  const AdminId = req.params.AdminId;
  const SellerId = req.params.SellerId;
  let AdminAccount = await Admin.findById(AdminId);
  let SellerAccount = await Seller.findById(SellerId);
  if (!AdminAccount) {
    return res.status(403).json({ Message: "Unautherized Request !" });
  } else if (!SellerAccount) {
    return res.status(404).json({ Message: "Seller Non Existant !" });
  }
  try {
    await Seller.findByIdAndDelete(SellerId);
    return res.status(200).json({ Message: "Account Deleted !" });
  } catch (err) {
    console.log(err);
  }
};

// function to disable a seller account making it unavailable for log in
export const SellerAccountDisabling = async (req, res) => {
  const SellerId = req.params.SellerId;
  let DisabledAccount;
  try {
    DisabledAccount = await Seller.findById(SellerId);
  } catch (err) {
    console.log({ err });
  }
  if (!DisabledAccount) {
    return res.status(500).json({ Message: "Server Error Try Again Soon !" });
  }
  DisabledAccount.ActiveStatus = false;
  await DisabledAccount.save();
  return res.status(200).json({ Message: "Account Disabled" });
};

//
export const VerifySellerAccount = asyncHandler(async (req, res) => {});

//
export const getOngoingAuctions = async (req, res) => {
  try {
    const auctionId = req.body.auctionId;
    const auction = await AuctionListing.findById(auctionId);
    return res.json({ auction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Message: "Server Error" });
  }
};

export const getCompletedAuctions = async (req, res) => {
  try {
    const auctionId = req.body.auctionId;
    const auction = await AuctionListing.findById(auctionId);
    return res.json({ auction });
  } catch (err) {
    console.log(err);
    return res.json({ Message: "Server Error" });
  }
};

export const endAuction = async (req, res) => {
  const auctionId = req.body.auctionId;
  let seller = req.seller;
  try {
    let completedAuction = await AuctionListing.findById(auctionId);
    const newOngoingArray = seller.Listings.Ongoing.filter(
      (_id) => _id.toString() !== auctionId.toString()
    );

    console.log(newOngoingArray);
    seller.Listings.Ongoing = newOngoingArray;
    seller.Listings.Finiched.push(auctionId);
    await seller.save();
    let auction = AuctionListing.findById(auctionId);
    auction.OngoinStatus = false;
    await auction.save();
    return res.json({ seller });
  } catch (err) {
    console.log(err);
    return res.json({ Message: "Server Error" });
  }
};

export const getUpdatedProfile = async (req, res) => {
  try {
    return res.json({ seller: req.seller });
  } catch (err) {
    console.log(err);
    return res.json({ Message: "Error" });
  }
};

export const editSeller = asyncHandler(async (req, res) => {
  try {
    const {
      BusinessName,
      Email,
      Password,
      ConfirmPassword,
      FullLocation,
      State,
      City,

      BusinessLogo,
      PhoneNumber,
    } = req.body;
    let seller = req.seller;
    BusinessName ? (seller.BusinessName = BusinessName) : null;
    Email ? (seller.Email = Email) : null;
    FullLocation ? (seller.FullLocation = FullLocation) : null;
    State ? (seller.State = State) : null;
    City ? (seller.City = City) : null;
    PhoneNumber ? (seller.PhoneNumber = PhoneNumber) : null;
    BusinessLogo ? (seller.BusinessLogo = BusinessLogo) : null;

    if (Password && !ConfirmPassword) {
      return res.json({ Message: "Confirm Password Is Missing" });
    } else if (Password != ConfirmPassword) {
      return res.json({ Message: "Passwords Dont Match" });
    } else if (Password) {
      const passwordcheck = bcrypt.compareSync(Password, seller.Password);
      if (passwordcheck) {
        return res.json({ Message: "Cannot Use The Same Old Password" });
      }
      seller.Password = Password;
    }
    await seller.save();
    return res.json({ seller });
  } catch (err) {
    console.log(err);
    res.json({ Message: "Server Error" });
  }
});
