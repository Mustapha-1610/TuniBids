import mongoose, { Types } from "mongoose";
const Schema = mongoose.Schema;
const sellerSchema = new Schema({
  BusinessName: {
    type: String,
    required: true,
    unique: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
    minLength: 6,
  },
  ProfilePicture: {
    type: String,
  },
  State: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  FullLocation: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  BusinessLicense: {
    type: String,
  },
  ActiveStatus: {
    type: Boolean,
    default: true,
  },
  ValidationStatus: {
    type: Boolean,
    default: false,
  },
  TaxRegistrationCertificate: {
    type: String,
  },
  Rating: {
    type: Number,
    default: 0,
  },
  Listings: {
    Ongoing: [
      {
        type: Schema.Types.ObjectId,
        ref: "AuctionListing",
      },
    ],
    Finiched: [
      {
        type: Schema.Types.ObjectId,
        ref: "AuctionListing",
      },
    ],
    PendingApproval: [
      {
        type: Schema.Types.ObjectId,
        ref: "AuctionListing",
      },
    ],
  },
  Earnings: {
    type: Number,
    default: 0,
  },
  Orders: {
    Pending: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    Shipped: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    Disputed: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  BusinessLogo: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Seller", sellerSchema);
