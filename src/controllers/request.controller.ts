import { createChat } from "./chat.controller";
import Requests from "../domains/request/model";

// create a new requests
const requestByMail = async (data) => {
  const {
    facility,
    why,
    reminderDate,
    note,
    requestBy,
    facilityEmail,
    isUrgent,
    folderNo,
  } = data;
  try {
    const createdRequests = [];
    if (facility.length >= 1) {
      for (const e of facility) {
        const newRequest = new Requests({
          why,
          facilityId: e.data.id,
          reminderDate,
          note,
          requestBy,
          facilityEmail: e.data.email,
          isUrgent,
          folderNo,
        });

        // Save request
        let chatData = {
          senderId: requestBy,
          senderModel: "User",
          recipientId: e.data.id,
          recipientModel: "HospitalFacility",
        };

        try {
          const chatResponse = await createChat(chatData);
          const createdRequest = await newRequest.save();
          createdRequests.push(createdRequest);
        } catch (error) {
          console.error("Error during chat creation or request saving:", error);
        }
      }
    } else {
      const newRequest = new Requests({
        why,
        facilityId: "",
        reminderDate,
        note,
        requestBy,
        facilityEmail,
        isUrgent,
        folderNo,
      });

      // Save request
      try {
        const createdRequest = await newRequest.save();
        createdRequests.push(createdRequest);
      } catch (error) {
        console.error("Error saving request (no facility):", error);
      }
    }
    return createdRequests;
  } catch (err) {
    console.error("Error in requestByMail:", err);
    throw err;
  }
};

//approve request
const approveRequest = async (requestId) => {
  try {
    // Fetch the request by ID
    const request = await Requests.findById(requestId);

    if (!request) {
      throw new Error("Request not found");
    }

    // Update the approval status
    request.isApprove = true;

    // Save the updated request
    await request.save();

    return request;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// disapprove request
const disApproveRequest = async (data) => {
  const { requestsId, note } = data;

  try {
    const request = await Requests.findById({ _id: requestsId });
    request.isApprove = false;
    request.note = note;
    await request.save();
    // save requests
    return request;
  } catch (err) {
    throw err;
  }
};
const getUserRequests = async (_id) => {
  try {
    const requests = await Requests.find({ requestBy: _id });
    if (!requests) throw Error("No requests found with this user id");
    return requests;
  } catch (err) {
    throw err;
  }
};
const getSingleRequests = async (_id) => {
  try {
    const requests = await Requests.findOne({ _id }).populate("requestBy");
    if (!requests) throw Error("No requests found with this id");
    return requests;
  } catch (err) {
    throw err;
    return null;
  }
};
const getHospitalRequests = async (_id) => {
  try {
    const requests = await Requests.find({ facilityId: _id }).populate(
      "requestBy"
    );
    if (!requests) throw Error("No requests found with this hospital id");
    return requests;
  } catch (err) {
    throw err;
  }
};
const getAllRequests = async () => {
  try {
    const requestss = await Requests.find();
    return requestss;
  } catch (err) {
    throw err;
  }
};
const deleteRequests = async (requestsId) => {
  try {
    const requests = await Requests.deleteOne({ _id: requestsId });
    return {
      requests,
    };
  } catch (err) {
    throw err;
  }
};

export {
  deleteRequests,
  getAllRequests,
  getHospitalRequests,
  getUserRequests,
  requestByMail,
  approveRequest,
  disApproveRequest,
  getSingleRequests,
};
