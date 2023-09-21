import mongoose from "mongoose";
const Schema = mongoose.Schema;
const auctionRoomSchema = new Schema({
  Participants: {
    type: Number,
    default: 0,
  },
  AuctionListing: {
    type: Schema.Types.ObjectId,
    ref: "AuctionListing",
  },
  HighestBidder: {
    BidderName: {
      type: String,
    },
    BidderId: {
      type: Schema.Types.ObjectId,
      ref: "Bidder",
    },
    HighestBid: {
      type: Number,
    },
  },
  RemainingTime: {
    type: Number,
    default: 30,
  },
  OngoingStatus: {
    type: Boolean,
    default: true,
  },
});
export default mongoose.model("AuctionRoom", auctionRoomSchema);
