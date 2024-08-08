import mongoose from "mongoose";

const UserSchema = new mongoose.Schema<any>({
  firstName: { type: String, required: true, unique: true },
  lastName: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  emailVerification: { type: Boolean, default: false },
  email: { type: String, required: true, unique: true },
  nerveId: { type: String, required: false, unique: true },
  userType: { type: String, default: "user" },
  dateCreated: { type: Date, default: Date.now() },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
