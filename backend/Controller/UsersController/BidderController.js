import Bidder from "../../Models/UserEntities/Bidder.js";
import Tokens from "../../Models/TokenEntities/Tokens.js";
import generateBidderToken from "../../utils/generateBidderToken.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { sendBidderConfirmationEmail } from "../../utils/NodeMailerConfig.js";

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
    return res.json({ BidderAccount });
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
export const UserAccountEnabling = asyncHandler(async (req, res) => {
  try {
    let BidderAccount = await Bidder.findById(req.params.BidderId);
    if (!BidderAccount) {
      res.status(403);
      throw new Error("Invalid Account Try Again Later");
    }
    BidderAccount.ActivenessStatus = true;
    await BidderAccount.save();
    return res.status(200).json({ Message: "Account Enabled !" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Server Error !" });
  }
});

//
export const getBidder = async (req, res) => {
  try {
    let BidderAccount = await Bidder.findById(req.params.BidderId);
    if (!BidderAccount) {
      return res.status(400).json({ Message: "Error Account Non Existant" });
    }
    return res.status(200).json({ BidderAccount });
  } catch (err) {
    console.log(err);
    return res.status(500).status({ Message: "Server Error !" });
  }
};

// disable bidder account
export const AccountDisabling = async (req, res) => {
  try {
    let DisabledAccount = await Bidder.findById(req.params.id);
    if (!DisabledAccount) {
      return res.status(500).json({ Message: "Server Error Try Again Soon !" });
    }
    DisabledAccount.ActivenessStatus = false;
    await DisabledAccount.save();
    return res.status(200).json({ Message: "Account Disabled" });
  } catch (err) {
    console.log({ err });
    return res.status(500).status({ Message: "Server Error !" });
  }
};

// a function for bidders to buy tokens
export const BuyTokens = async (req, res) => {
  try {
    const TokenId = req.params.TokenId;
    const BidderId = req.params.BidderId;
    const { Amount } = req.body;
    let BidderAccount, Token;
    let newToken = null;

    BidderAccount = await Bidder.findById(BidderId);
    Token = await Tokens.findById(TokenId); // Update this line

    if (!BidderAccount) {
      return res.status(404).json({ Message: "Bidder not found!" });
    }

    if (!Token) {
      return res.status(404).json({ Message: "Token not found!" });
    }

    let token;
    for (let i = 0; i < BidderAccount.TokenStorage.length; i++) {
      if (BidderAccount.TokenStorage[i].Token.Value.equals(Token._id)) {
        token = BidderAccount.TokenStorage[i];
        break;
      }
    }
    console.log(token);
    if (!token) {
      newToken = {
        Token: {
          Value: TokenId,
          Amount: Amount,
        },
      };
      BidderAccount.TokenStorage.push(newToken);
      BidderAccount = await BidderAccount.save();
      return res.status(201).json({ Message: "Purchase successfull !" });
    } else {
      token.Token.Amount = token.Token.Amount + Amount;
      BidderAccount = await BidderAccount.save();
      return res.status(200).json({ Message: "Purchase successfull !" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).status({ Message: "Server Error !" });
  }
};

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
