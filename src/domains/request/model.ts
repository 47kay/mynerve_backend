import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
  facilityEmail: { type: String },
  note: { type: String },
  folderNo: { type: String },
  facilityId: {
    type: String,
    validate: {
      validator: function (v) {
        return mongoose.Types.ObjectId.isValid(v) || v === "";
      },
      message: (props) => `${props.value} is not a valid facilityId`,
    },
  },
  isApprove: { type: Boolean, default: false },
  isUrgent: { type: Boolean, default: false },
  validatedBy: { type: String },
  why: { type: String },
  reminderDate: { type: String },
  file: { type: String },
  requestBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateCreated: { type: Date, default: Date.now() },
});

const Request = mongoose.model("Request", RequestSchema);

export default Request;
