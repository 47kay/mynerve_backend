import Message from "../domains/message/model";

//create message

const createMessage = async (data) => {
  try {
    const { chatId, senderId, recipientId, message, name } = data;
    if (!chatId || !senderId || !recipientId || !message) {
      return;
    }
    const incomingMessage = new Message({
      chatId,
      senderId,
      recipientId,
      message,
      name,
    });
    const response = await incomingMessage.save();
    return response;
  } catch (err) {
    throw err;
  }
};

// get messages
const getMessages = async (chatId) => {
  try {
    const messages = await Message.find({ chatId });
    return messages;
  } catch (err) {
    throw err;
  }
};
// get messages
const deleteMessages = async (chatId) => {
  try {
    const messages = await Message.deleteMany();
    return messages;
  } catch (err) {
    throw err;
  }
};

export { createMessage, getMessages, deleteMessages };
