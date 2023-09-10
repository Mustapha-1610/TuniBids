import mongoose from "mongoose";
const Schema = mongoose.Schema;
const adSchema = new Schema({
  AdHolder: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
  },
  AdPrice: {
    type: Number,
  },
  AdImage: {
    type: String,
  },
  AdDescription: {
    type: String,
    required: true,
  },
});
export default mongoose.model("Ad", adSchema);
