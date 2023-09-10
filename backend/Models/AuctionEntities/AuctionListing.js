import mongoose from "mongoose";
import Bidder from "../UserEntities/Bidder.js";
const Schema = mongoose.Schema;
const auctionlistingSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  ParticipationFee: {
    type: Number,
    required: true,
  },
  MinParticipatedUsers: {
    type: Number,
  },
  FreeTokens: [
    {
      Type: {
        type: Schema.Types.ObjectId,
        ref: "Token",
      },
      Amount: {
        type: Number,
      },
    },
  ],
  DateStartAuction: {
    type: Date,
    required: true,
  },
  DateFinichAuction: {
    type: Date,
  },
  AuctionHolder: {
    type: String,
  },
  AuctionWinner: {
    type: Schema.Types.ObjectId,
    ref: "Bidder",
  },
  ParticipatedBidders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Bidder",
    },
  ],
  OngoinStatus: {
    type: Boolean,
    default: true,
  },
  Product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  AdminRejectionComment: {
    type: String,
  },
  Ad: {
    type: Schema.Types.ObjectId,
    ref: "Ad",
  },
});
export default mongoose.model("AuctionListing", auctionlistingSchema);