import mongoose from "mongoose";

const TipsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  createdAt: { type: Date, default: Date.now() },
});

const Tips = mongoose.model("Tips", TipsSchema);

export default Tips;
