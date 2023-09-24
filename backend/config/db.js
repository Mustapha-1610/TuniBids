import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn =
      await mongoose.connect(`mongodb+srv://Mustapha:Hutaoalbedozhongli22889844@tunisianauctionwebapp.42xhya2.mongodb.net/TuniBids?retryWrites=true&w=majority
JWT_SECRET = abc123`);
    console.log("MongoDB Connected !");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
