import Records from "../domains/medical_records/model";
import HospitalFacility from "../domains/hospital_facility/model";
import { approveRequest, getSingleRequests } from "./request.controller";
import sendMail from "../utils/sendMail";
import User from "../domains/user/model";

// create a new records
const saveRecords = async (data: any) => {
  const { requestId } = data;

  try {
    // Fetch the user by ID
    const request = await getSingleRequests(requestId);
    const user = await User.findById(request.requestBy._id);
    if (!request) {
      throw new Error("Invalid request id");
    }

    // Create new record and save it
    const newRecords = new Records(data);
    const createdRecords = await newRecords.save();

    // Approve the request
    await approveRequest(requestId);

    // Prepare email content
    const subject = "Approval for Retrieval of Medical History";
    const text = `
      <strong>Hi ${user.firstName} ${user.lastName},</strong>
      <p>Your medical records have been uploaded. Kindly check your portal.</p>
    `;

    // Email options
    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: user.email,
      subject,
      html: text,
    };

    // Send the email
    await sendMail(mailOptions);

    // Return the created records
    return createdRecords;
  } catch (err) {
    // Handle any errors
    console.error(err);
    throw err;
  }
};

// update records
const updateRecords = async (recordsId, data) => {
  try {
    const records = await Records.updateOne({ _id: recordsId }, data);
    if (!records) throw Error("No records with this ID");
    return records;
  } catch (err) {
    throw err;
  }
};
const getSingleRecords = async (_id) => {
  try {
    const records = await Records.findOne({ userId: _id });
    if (!records) throw Error("No records found with this user id");
    return records;
  } catch (err) {
    throw err;
  }
};
const getAllRecords = async () => {
  try {
    const recordss = await Records.find();
    return recordss;
  } catch (err) {
    throw err;
  }
};
const deleteRecords = async (recordsId) => {
  try {
    const records = await Records.deleteOne({ _id: recordsId });
    return {
      records,
    };
  } catch (err) {
    throw err;
  }
};

export {
  saveRecords,
  getAllRecords,
  updateRecords,
  getSingleRecords,
  deleteRecords,
};
