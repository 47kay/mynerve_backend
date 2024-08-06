import mongoose from "mongoose";
const HospitalFacilitySchema = new mongoose.Schema({
  name: { type: String, default: "" },
  address: { type: String, default: "" },
  email: { type: String, default: "", unique: true },
  phoneNumber: { type: String, default: "" },
  contactPerson: { type: String, default: "" },
  isVerify: { type: Boolean, default: false },
  isSuspended: { type: Boolean, default: false },
  isProfileUpdate: { type: Boolean, default: false },
  emailVerification: { type: Boolean, default: false },
  password: { type: String, required: true, select: false },
  userType: { type: String, default: "hospitalFacilityUser" },
  dateCreated: { type: Date, default: Date.now() },
});

const HospitalFacility = mongoose.model(
  "HospitalFacility",
  HospitalFacilitySchema
);
export default HospitalFacility;
