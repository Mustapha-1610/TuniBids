import mongoose from "mongoose";
const Schema = mongoose.Schema;
const productSchema = new Schema({
  ProductDescription: {
    type: String,
    required: true,
  },
  ProductOwner: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
  },
  MagasinPrice: {
    type: Number,
    required: true,
  },
  ReservePrcice: {
    type: Number,
    required: true,
  },
  ProductImage: {
    type: String,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
});
export default mongoose.model("Product", productSchema);
