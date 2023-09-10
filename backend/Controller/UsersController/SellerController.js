import Seller from "../../Models/UserEntities/Seller";
import Admin from "../../Models/UserEntities/Admin";
import bcrypt from "bcryptjs";
import { sendSellerConfirmationEmail } from "../../Config/NodeMailerConfig";

// Sign up function with tests on account existance and password encrypting
export const Signup = async (req, res, next) => {
  const {
    Name,
    Surname,
    Email,
    Password,
    State,
    City,
    FullLocation,
    PhoneNumber,
  } = req.body;
  if (
    !Name &&
    !Surname &&
    !Email &&
    !Password &&
    !State &&
    !City &&
    !FullLocation &&
    !PhoneNumber
  ) {
    return res.status(422).json({ Message: "invalid input" });
  }
  let existingSeller;
  existingSeller = await Seller.findOne({ Email });
  if (existingSeller) {
    return res.status(400).json({ message: "Account Exists Allready !" });
  }
  let newSeller;
  const securePassword = bcrypt.hashSync(Password);
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let ValidationCode = "";
  for (let i = 0; i < 25; i++) {
    ValidationCode += characters[Math.floor(Math.random() * characters.length)];
  }
  try {
    newSeller = new Seller({
      Name,
      Surname,
      Email,
      Password: securePassword,
      State,
      City,
      FullLocation,
      PhoneNumber,
      ValidationCode,
    });
    await newSeller.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ newSeller });
};
// Log in function with tests on existance of the account and the validity and active status of the account
export const Login = async (req, res) => {
  const { Email, Password } = req.body;

  let SellerAccount;
  if (!Email && !Password) {
    return res.status(401).json({ Message: "Invalid Input" });
  }
  try {
    SellerAccount = await Seller.findOne({ Email });
  } catch (err) {
    console.log(err);
  }
  if (!SellerAccount) {
    return res.status(404).json({ Message: "Account Dosent Exist" });
  }
  const passwordcheck = bcrypt.compareSync(Password, SellerAccount.Password);
  if (!passwordcheck) {
    return res.status(404).json({ Message: "Invalid email or password !" });
  }
  if (SellerAccount.ActiveStatus == false) {
    return res.status(401).json({ Message: "This Account Is Disabled" });
  }
  if (SellerAccount.ValidationStatus == false) {
    return res.status(401).json({ Message: "Account Awaiting Validation" });
  }
  return res.status(200).json({ SellerAccount });
};
//
export const getSeller = async (req, res) => {
  try {
    let SellerAccount = await Seller.findById(req.params.SellerId);
    if (!SellerAccount) {
      return res.status(400).json({ Message: "Input Or Data Base Error" });
    }
    return res.status(200).json({ SellerAccount });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Server Error !" });
  }
};
// Function to display all Sellers
export const AllSellers = async (req, res) => {
  let AllSellers;
  try {
    AllSellers = await Seller.find();
  } catch (err) {
    console.log(err);
  }
  if (AllSellers.length === 0) {
    res.status(200).json({ Message: "There Are No Sellers" });
  } else {
    res.status(200).json({ AllSellers });
  }
};
// Function to display all seller accounts who are waiting to be validated
export const SellersPendingValidation = async (req, res) => {
  let PendingSellers;
  try {
    PendingSellers = await Seller.find({ ValidationStatus: false });
    if (PendingSellers.length === 0) {
      return res
        .status(200)
        .json({ Message: "There are no current sellers pending validation" });
    }
    res.status(200).json({ PendingSellers });
  } catch (err) {
    console.log(err);
  }
};
// Function to validate a seller account
export const SendConfirmationEmail = async (req, res) => {
  try {
    let SellerAccount = await Seller.findById(req.params.SellerId);
    sendSellerConfirmationEmail(
      SellerAccount.Name,
      SellerAccount.Email,
      SellerAccount._id,
      SellerAccount.ValidationCode
    );
    return res.status(200).json({ Message: "Email Sent !" });
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({ Message: "Account Validated" });
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
export const VerifySellerAccount = async (req, res) => {
  try {
    let SellerAccount = await Seller.findById(req.params.SellerId);
    const ActivationCode = req.params.ActivationCode;
    if (!ActivationCode === SellerAccount.ActivationCode) {
      return res.status(400).json({ Message: "Error try again later !" });
    }
    SellerAccount.ValidationStatus = true;
    SellerAccount = await SellerAccount.save();
    return res
      .status(201)
      .json({ Message: "Email verified you can now log in !" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ Message: "Server Error" });
  }
};
