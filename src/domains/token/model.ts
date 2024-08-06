import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  token: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now() },
});

const Token = mongoose.model("Token", TokenSchema);

export default Token;
