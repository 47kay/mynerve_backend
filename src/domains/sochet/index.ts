import { createMessage } from "../../controllers/message.controller";

// add new user or login user or add user to online array
let onlineUsers = [];
const addOnlineUser = async (socket, io) => {
  socket.on("addOnlineUser", (userId) => {
    const user = onlineUsers.find((user) => user.userId === userId);
    if (!user) {
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    }
    io.emit("getOnlineUsers", onlineUsers);
  });
};
// add remove user or logout user or remove user to online array
const disConnectUser = async (socket, io) => {
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

    io.emit("getOnlineUsers", onlineUsers);
  });
};
const getOnlineUser = async (socket, io) => {
  socket.on("getOnlineUsers", () => {
    io.emit("getOnlineUsers", onlineUsers);
  });
};
// send message and // notification
const sendMessage = async (socket, io) => {
  socket.on("sendMessage", async (data) => {
    const { senderId, recipientId, chatId, message, name } = data;

    io.emit(recipientId, {
      ...data,
      isRead: false,
    });

    // save message to db.
    await createMessage({
      chatId,
      senderId,
      recipientId,
      message,
      name,
    });
  });
};

const sendConnectionMessage = async (socket, io) => {
  socket.on("sendConnectionMessage", async (data) => {
    // const { senderId, recipientId, chatId , message, name ,image} = data;
    const { recipientId } = data;

    io.emit(recipientId, {
      ...data,
      isRead: false,
    });
  });
};
// notifications

const sendNotifications = async (io, data) => {
  // socket.on("notifications", async (userId) => {
  // const user = onlineUsers.find(user => user.userId === recipientId);
  console.log(io, data, "test");
  io.emit(data.userId, {
    message: data.message,
    isRead: false,
    date: new Date(),
  });
  // });
};

export {
  addOnlineUser,
  getOnlineUser,
  disConnectUser,
  sendMessage,
  sendNotifications,
  sendConnectionMessage,
};
