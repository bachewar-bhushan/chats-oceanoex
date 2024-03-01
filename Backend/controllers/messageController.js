import Chat from "../models/chatModel.js";
import Message from "../models/messageModel.js";
import { getSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    let message = req.body.message;
    const chatId = req.body.chatId;
    const receiverId = req.params.receiverId;
    const senderId = req.user._id;
    const photo = req.files;

    console.log("this is chatID",chatId)
    console.log("running send message...");

    console.log(message);
    console.log(receiverId);
    console.log("this is my photo", photo);

    // If message is empty, set it to null
    if (!message || message.trim() === "") {
      message = null;
    }

    let chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, receiverId],
      });
    }

    // Check if 'message' is present before creating currentMessage
    const currentMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      message: message,
      photo: photo,
    });

    if (currentMessage) {
      chat.messages.push(currentMessage._id);
    }

    await Promise.all([chat.save(), currentMessage.save()]);

    // Socket IO functionality goes here

    const receiverSocketId = getSocketId(receiverId);
    const senderSocketId = getSocketId(senderId);

    if (senderSocketId) {
      if (message !== null && photo) {
        io.in(chatId).emit("newMessage", {
          message,
          senderSocketId,
          receiverSocketId,
          photo,
        });
      } else if (photo === undefined && message !== null) {
        io.in(chatId).emit("newMessage", {
          message,
          senderSocketId,
          receiverSocketId,
        });
      } else if (photo && message === null) {
        io.in(chatId).emit("newMessage", {
          senderSocketId,
          receiverSocketId,
          photo,
        });
      }

      res.status(201).json({ message, photo });
    }
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const receiverId = req.params.receiverId;
    const senderId = req.user._id;

    const chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate({
      path: "messages",
      populate: {
        path: "sender",
      },
    });

    if (!chat) {
      return res.status(200).json([]);
    }
    const messages = chat.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
