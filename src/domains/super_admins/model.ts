import mongoose from "mongoose";
const SuperAdminSchema = new mongoose.Schema({
  password: { type: String, required: true, select: false },
  username: { type: String, required: true, unique: true },
  userType: { type: String, default: "superAdmin" },
  dateCreated: { type: Date, default: Date.now() },
});

const SuperAdmin = mongoose.model("SuperAdmin", SuperAdminSchema);
export default SuperAdmin;
