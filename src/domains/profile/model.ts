import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  middleName: { type: String, default: "" },
  placeOfBirth: { type: String, default: "" },
  gender: { type: String, default: "" },
  nationality: { type: String, default: "" },
  userEmoji: { type: String, default: "" },
  stateOfOrigin: { type: String, default: "" },
  maritalStatus: { type: String, default: "" },
  permanentAddress: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },
  description: { type: String, default: "" },
  profileImage: { type: String, default: "" },
  occupation: { type: String, default: "" },

  dateOfBirth: { type: Date, default: null },

  // next of kin
  nextOfKinFirstName: { type: String, default: "" },
  nextOfKinLastName: { type: String, default: "" },
  nextOfKinMiddleName: { type: String, default: "" },
  nextOfKinPlaceOfBirth: { type: String, default: "" },
  nextOfKinGender: { type: String, default: "" },
  nextOfKinDateOfBirth: { type: Date, default: null },
  nextOfKinNationality: { type: String, default: "" },
  nextOfKinEmoji: { type: String, default: "" },
  nextOfKinStateOfOrigin: { type: String, default: "" },
  nextOfKinMaritalStatus: { type: String, default: "" },
  nextOfKinPermanentAddress: { type: String, default: "" },
  nextOfKinPhoneNumber: { type: String, default: "" },
  nextOfKinEmail: { type: String, default: "" },
  relationship: { type: String, default: "" },
  nextOfKinOccupation: { type: String, default: "" },

  // basic medical information
  bloodGroup: { type: String, default: "" },
  genotype: { type: String, default: "" },
  rhFactor: { type: String, default: "" },
  height: { type: String, default: "" },
  weight: { type: String, default: "" },
  allergies: { type: String, default: "" },
  medicalCondition: { type: String, default: "" },
  medications: { type: String, default: "" },
  immunizations: { type: String, default: "" },
  vaccinations: { type: String, default: "" },
  surgeries: { type: String, default: "" },
  familyMedicalHistory: { type: String, default: "" },
  emergencyContactName: { type: String, default: "" },
  emergencyContactRelationship: { type: String, default: "" },
  emergencyContactPhoneNumber: { type: String, default: "" },
  emergencyContactEmail: { type: String, default: "" },
  healthInsurance: { type: String, default: "" },
  isComplete: { type: Boolean, default: false },
  isUpdated: { type: Boolean, default: false },
  hasConnection: { type: Boolean, default: false },
  dateCreated: { type: Date, default: Date.now() },
});

const Profile = mongoose.model("Profile", ProfileSchema);
export default Profile;
