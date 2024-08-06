import Connection from "../domains/connection/model";

// create a new connection
const makeConnect = async (data) => {
  const { requestBy, bloodline, description, route } = data;
  const alreadySentRequest = await Connection.findOne({
    $or: [{ requestBy: requestBy }, { bloodline: bloodline }],
  });
  if (alreadySentRequest)
    throw Error("You have previously sent a request to this user");
  try {
    const newRequest = new Connection({
      requestBy,
      bloodline,
      description,
      route,
    });
    // save connection
    const createdRequest = await newRequest.save();
    return createdRequest;
  } catch (err) {
    throw err;
  }
};

//approve connection
const approveConnection = async (id) => {
  try {
    const connection = await Connection.findById(id);
    if (!connection) {
      throw Error("Connection not found");
    }
    connection.isAccepted = true;
    await connection.save();
    return connection;
  } catch (err) {
    throw err; // Re-throw the error to be handled by the caller
  }
};

// disapprove connection
const disApproveConnection = async (id) => {
  try {
    const connection = await Connection.findById(id);
    if (!connection) {
      throw Error("Connection not found");
    }
    connection.isAccepted = false;
    await connection.save();
    return connection;
  } catch (err) {
    throw err; // Re-throw the error to be handled by the caller
  }
};
const getUserConnectedBloodline = async (userId) => {
  try {
    const connections = await Connection.find({
      $or: [{ requestBy: userId }, { bloodline: userId }],
      isAccepted: true,
    })
      .populate({
        path: "bloodline",
        populate: { path: "profile" }, // Nested population
      })
      .populate({
        path: "requestBy",
        populate: { path: "profile" }, // Nested population
      });

    return connections;
  } catch (err) {
    console.error("Error fetching user connections:", err);
    throw err; // Re-throw the error after logging it
  }
};
const getUserConnection = async (userId) => {
  try {
    const connections = await Connection.find({
      $or: [{ requestBy: userId }, { bloodline: userId }],
    })
      .populate({
        path: "bloodline",
        populate: { path: "profile" }, // Nested population
      })
      .populate({
        path: "requestBy",
        populate: { path: "profile" }, // Nested population
      });

    return connections;
  } catch (err) {
    console.error("Error fetching user connections:", err);
    throw err; // Re-throw the error after logging it
  }
};

const getUserRelatedConnection = async (data) => {
  try {
    // Perform a single query using the $or operator
    const connections = await Connection.find({
      $or: [
        { requestBy: { $in: data.requestBy } },
        { bloodline: { $in: data.bloodline } },
      ],
      isAccepted: true, // Ensure only accepted connections are fetched
    })
      .populate({
        path: "bloodline",
        populate: { path: "profile" }, // Nested population
      })
      .populate({
        path: "requestBy",
        populate: { path: "profile" }, // Nested population
      });

    // Remove duplicates by _id
    const uniqueConnectionsMap = new Map();
    connections.forEach((conn) => {
      uniqueConnectionsMap.set(conn._id.toString(), conn);
    });

    const uniqueConnections = Array.from(uniqueConnectionsMap.values());

    return uniqueConnections;
  } catch (err) {
    console.error("Error fetching user connections:", err);
    throw err; // Re-throw the error after logging it
  }
};

const getUserConnectionRequest = async (id) => {
  try {
    const connections = await Connection.find({
      bloodline: id,
      isAccepted: false,
    })
      .populate({
        path: "bloodline",
        populate: { path: "profile" }, // Nested population
      })
      .populate({
        path: "requestBy",
        populate: { path: "profile" }, // Nested population
      });

    return connections;
  } catch (err) {
    throw err; // Rethrow the error after logging it
  }
};

const getAllConnection = async () => {
  try {
    const requests = await Connection.find()
      .populate({
        path: "bloodline",
        populate: { path: "profile" }, // Nested population
      })
      .populate({
        path: "requestBy",
        populate: { path: "profile" }, // Nested population
      });
    return requests;
  } catch (err) {
    throw err;
  }
};
const deleteConnection = async (id) => {
  try {
    const connection = await Connection.deleteOne({ _id: id });
    return {
      connection,
    };
  } catch (err) {
    throw err;
  }
};

export {
  deleteConnection,
  getAllConnection,
  getUserConnection,
  disApproveConnection,
  makeConnect,
  approveConnection,
  getUserConnectionRequest,
  getUserRelatedConnection,
  getUserConnectedBloodline,
};
