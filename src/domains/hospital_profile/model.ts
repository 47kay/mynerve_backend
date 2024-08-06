import mongoose from "mongoose";
const HospitalFacilityProfilechema = new mongoose.Schema({
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  email: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },
  country: { type: String, default: "" },
  state: { type: String, default: "" },
  addressOne: { type: String, default: "" },
  addressTwo: { type: String, default: "" },
  specialization: { type: String, default: "" },

  payoutEmail: { type: String, default: "" },
  payoutPhoneNumber: { type: String, default: "" },
  payoutAddressOne: { type: String, default: "" },
  payoutAddressTwo: { type: String, default: "" },
  callme: { type: String, default: false },

  hospitalFacilityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HospitalFacility",
  },
  dateCreated: { type: Date, default: Date.now() },
});

const HospitalFacilityProfile = mongoose.model(
  "HospitalFacilityProfile",
  HospitalFacilityProfilechema
);
export default HospitalFacilityProfile;
