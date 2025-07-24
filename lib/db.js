import mongoose from "mongoose";

//function to connect to MongoDB
export const connectDB = async () => {
  try{ 
    mongoose.connection.on('connected', () => console.log('MongoDB connected successfully'));
    await mongoose.connect(`${rocess.env.MONGODB_URI}/chat-app`)

  }catch(error) {
    console.log("MongoDB connection failed:", error);

  }
}