import mongoose from "mongoose";
const Schema = mongoose.Schema;
const sellerSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Surname: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Password: {
    type: String,
    required: true,
    minLength: 6,
  },
  ProfilePicture: {
    type: String,
    required: true,
  },
  State: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  FullLocation: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  ProfilePicture: {
    type: String,
    required: false,
  },
  BusinessLicense: {
    type: String,
  },
  ActiveStatus: {
    type: Boolean,
    default: true,
  },
  ValidationStatus: {
    type: Boolean,
    default: false,
  },
  ValidationCode: {
    type: String,
  },
  TaxRegistrationCertificate: {
    type: String,
  },
  Rating: {
    type: Number,
    default: 0,
  },
});
export default mongoose.model("Seller", sellerSchema);
