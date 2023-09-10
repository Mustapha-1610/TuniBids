import mongoose from "mongoose";
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  WinningBidder: {
    type: Schema.Types.ObjectId,
    ref: "Bidder",
  },
  Product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  Date: [
    {
      EstimatedArrivalDate: {
        type: Date,
      },
      ArrivalDate: {
        type: Date,
      },
    },
  ],
  ArrivalStatus: {
    type: Boolean,
    default: false,
  },
});
export default mongoose.model("Order", orderSchema);
