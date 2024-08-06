import mongoose from "mongoose";

const ConnectionSchema = new mongoose.Schema({
  requestBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  bloodline: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  description: { type: String, default: "" },
  route: { type: String, default: "" },

  isAccepted: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now() },
});

const Connection = mongoose.model("Connection", ConnectionSchema);

export default Connection;
