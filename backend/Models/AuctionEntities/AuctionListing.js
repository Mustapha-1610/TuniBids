import mongoose from "mongoose";
const Schema = mongoose.Schema;
const auctionlistingSchema = new Schema({
  Title: {
    type: String,
    required: true,
  },
  ParticipationFee: {
    type: Number,
    required: true,
  },
  MinParticipatedUsers: {
    type: Number,
    required: true,
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
  Date: {
    DataStartAuction: {
      type: Date,
      required: true,
    },
    Auctioncompletiondate: {
      type: Date,
    },
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
    ProductDescription: {
      type: String,
      required: true,
    },
    MagasinPrice: {
      type: Number,
      required: true,
    },
    ReservePrice: {
      type: Number,
      required: true,
    },
    ProductImage: {
      type: String,
    },
    Quantity: {
      type: Number,
      required: true,
    },
  },
  AdminRejectionComment: {
    type: String,
  },
  Ad: {
    type: Schema.Types.ObjectId,
    ref: "Ad",
  },
  ActivenessStatus: {
    type: Boolean,
    default: false,
  },
  Winningprice: {
    type: Number,
  },
});
export default mongoose.model("AuctionListing", auctionlistingSchema);
