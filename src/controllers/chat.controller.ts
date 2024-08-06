import { getMessages } from "./message.controller";
import { getSingleUser } from "./user.controller";
import Chat from "../domains/chat/model";
// const {}

//create chat
const createChat = async (data) => {
  const { senderId, recipientId, senderModel, recipientModel } = data;
  try {
    if (!senderId || !recipientId) {
      throw new Error("Sender ID and Recipient ID cannot be empty");
    }

    // Check if a chat already exists between the two participants
    const existingChat = await Chat.findOne({
      $or: [
        { senderId, recipientId },
        { senderId: recipientId, recipientId: senderId },
      ],
    });

    // Return the existing chat if found
    if (existingChat) {
      return existingChat;
    }

    // Create a new chat if no existing chat is found
    const newChat = new Chat({
      senderId,
      recipientId,
      senderModel,
      recipientModel,
    });

    // Save the new chat
    const response = await newChat.save();
    return response;
  } catch (err) {
    console.error("Error in createChat:", err);
    throw err;
  }
};

//get user chat
const findUserChats = async (userId) => {
  try {
    const chats = await Chat.find({
      $or: [{ senderId: userId }, { recipientId: userId }],
    })
      .populate("senderId")
      .populate("recipientId");

    return chats;
  } catch (err) {
    throw err;
  }
};

// recent chat interaction
const findRecentChatInteraction = async (userId) => {
  try {
    const chat = await Chat.find({
      members: { $in: [userId] },
    });
    const recentChat = [];

    const processChat = async (chatId) => {
      const messages = await getMessages(chatId);
      const latestMsg = messages[messages.length - 1];
      const recentChatUser = await getSingleUser(
        latestMsg?.senderId.toString() === userId
          ? latestMsg?.recipientId
          : latestMsg?.senderId
      );
      const newLatestMsg = {
        _id: latestMsg?._id,
        chatId: latestMsg?.chatId,
        message: latestMsg?.message,
        createdAt: latestMsg?.createdAt,
        updatedAt: latestMsg?.updatedAt,
        __v: "0",
        date: latestMsg?.date,
        isRead: latestMsg?.isRead,
        recentChatUser,
      };
      return newLatestMsg;
    };
    const processChats = async (chats) => {
      const processedChats = await Promise.all(
        chats.map((chat) => processChat(chat._id))
      );

      processedChats.forEach((newLatestMsg) => {
        const item = recentChat.find((e) => e?.chatId === newLatestMsg?.chatId);
        if (!item && newLatestMsg?.recentChatUser !== null) {
          recentChat.push(newLatestMsg);
        }
      });

      return recentChat;
    };
    const response = await processChats(chat);
    return response;
  } catch (err) {
    throw err;
  }
};
//find chat
const findInitialChatForHealthcare = async (senderId, recipientId) => {
  try {
    const chat = await Chat.findOne({ senderId, recipientId });
    return chat;
  } catch (err) {
    throw err;
  }
};
// delete chat

const deleteChat = async (id) => {
  try {
    const res = await Chat.deleteMany({ _id: id });
    return res;
  } catch (err) {
    throw err;
  }
};

export {
  findInitialChatForHealthcare,
  findUserChats,
  deleteChat,
  createChat,
  findRecentChatInteraction,
};
