import mongoose from "mongoose";
const Schema = mongoose.Schema;
const personalinfosSchema = new Schema({
  Weight: {
    type: Number,
    required: true,
  },
  Douche: {
    type: Boolean,
    required: true,
  },
  Food: [
    {
      type: String,
    },
  ],
  Oil: {
    type: Boolean,
    required: true,
  },
  TeethBrushing: [
    {
      Morning: {
        type: Boolean,
        required: true,
      },
      Evening: {
        type: Boolean,
        required: true,
      },
      Night: {
        type: Boolean,
        required: true,
      },
    },
  ],
  Date: {
    type: Date,
    required: true,
  },
});
export default mongoose.model("Card", personalinfosSchema);
