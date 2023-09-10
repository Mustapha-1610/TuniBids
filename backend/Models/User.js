import mongoose from "mongoose";
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  Username: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  HealthCards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cards",
    },
  ],
});
export default mongoose.model("User", UserSchema);
