import mongoose from "mongoose";

async function connectDb(MONGO_URI) {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Db connected");
  } catch (error) {
    console.log("Database error ", error.message);
  }
}

export default connectDb;
