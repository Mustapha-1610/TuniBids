import mongoose from "mongoose";
const Schema = mongoose.Schema;
const tokensSchema = new Schema({
  Price: {
    type: Number,
  },
  Value: {
    type: Number,
  },
});
export default mongoose.model("Tokens", tokensSchema);
