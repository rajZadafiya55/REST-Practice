import mongoose from "mongoose";

const connectDb = (URL) => {
  try {
    mongoose.connect(URL).then(() => {
      console.log("Database connected.!");
    });
  } catch (error) {
    console.log("error", error);
  }
};

export default connectDb;
