import mongoose from "mongoose";
const Schema = mongoose.Schema;
const productSchema = new Schema({});
export default mongoose.model("Product", productSchema);
