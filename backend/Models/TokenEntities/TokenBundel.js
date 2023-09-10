import mongoose from "mongoose";
const Schema = mongoose.Schema;
const tokenBundelSchema = new Schema({
  TokenType: {
    type: Schema.Types.ObjectId,
    ref: "Token",
  },
  Amount: {
    type: Number,
  },
  BundelPrice: {
    type: Float32Array,
  },
});
export default mongoose.model("TokenBundel", tokenBundelSchema);
