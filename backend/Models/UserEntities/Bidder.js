import mongoose from "mongoose";
const Schema = mongoose.Schema;
const bidderSchema = new Schema({
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
  FullAdress: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  BirthDate: {
    type: Date,
    required: false,
  },
  ProfilePicture: {
    type: String,
    required: false,
  },
  ParticipatedAuction: {
    OnGoing: [
      {
        type: Schema.Types.ObjectId,
        ref: "AuctionListing",
      },
    ],
    Finiched: [
      {
        type: Schema.Types.ObjectId,
        ref: "AuctionListing",
      },
    ],
    AuctionWon: [
      {
        type: Schema.Types.ObjectId,
        ref: "AuctionListing",
      },
    ],
  },
  TokenStorage: [
    {
      Token: {
        Value: {
          type: Schema.Types.ObjectId,
          ref: "Tokens",
        },
        Amount: {
          type: Number,
        },
      },
    },
  ],
  ActivationStatus: {
    type: Boolean,
    default: false,
  },
  ActivationCode: {
    type: String,
  },
  ActivenessStatus: {
    type: Boolean,
    default: true,
  },
  WinningsOrders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  Notifications: [
    {
      NotificationMessage: {
        type: String,
      },
      RoomId: {
        type: Schema.Types.ObjectId,
        ref: "AuctionRoom",
        default: null,
      },
    },
  ],
  ProfilePicture: {
    type: String,
    defualt:
      "https://firebasestorage.googleapis.com/v0/b/tunibids.appspot.com/o/Windows_10_Default_Profile_Picture.svg.png?alt=media&token=e7aca30d-6eea-45ff-8522-db048fcb8c38",
  },
});
export default mongoose.model("Bidder", bidderSchema);
