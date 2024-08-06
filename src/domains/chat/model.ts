import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "senderModel",
    },
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "recipientModel",
    },
    senderModel: {
      type: String,
      required: true,
      enum: ["User", "HospitalFacility", "SuperAdmin"],
    },
    recipientModel: {
      type: String,
      required: true,
      enum: ["User", "HospitalFacility", "SuperAdmin"],
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;
