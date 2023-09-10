import mongoose from "mongoose";
const Schema = mongoose.Schema;
const reviewSchema = new Schema({
  ReviewedSeller: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
  },
  Comment: {
    type: String,
  },
  Reviewer: {
    type: Schema.Types.ObjectId,
    ref: "Bidder",
  },
  ReviewerRating: {
    type: Float32Array,
  },
});
export default mongoose.model("Review", reviewSchema);
