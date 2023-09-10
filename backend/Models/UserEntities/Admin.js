import mongoose from "mongoose";
const Schema = mongoose.Schema;
const adminSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Key: {
    type: String,
  },
  userType: {
    type: String,
    default: "Admin",
  },
});
export default mongoose.model("Admin", adminSchema);
