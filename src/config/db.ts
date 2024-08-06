import mongoose from "mongoose";
import environmentVariables from "../utils/environments";

const { MONGO_URI } = environmentVariables;

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("DB connected");
  } catch (err) {
    console.log(err);
  }
};

connectToDB();
