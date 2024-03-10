import GroupChat from "../models/groupChatModel.js";
import Message from "../models/messageModel.js";
import { getSocketId, io } from "../socket/socket.js";

export const sendGroupMessage = async (req, res) => {
  try {
    let message = req.body.message;
    const groupId = req.params.groupId;
    const senderId = req.user._id;
    const photo = req.files;
    const fullName = req.body.fullName;
    const profilePic = req.body.profilePic;

    if (!message || message.trim() === "") {
      message = null;
    }

    let groupChat = await GroupChat.findOne({ _id: groupId });

    if (!groupChat) {
      return res.status(404).json({ error: "No group found" });
    }

    const currentMessage = new Message({
      sender: senderId,
      message: message,
      photo: photo,
    });

    if (currentMessage) {
      groupChat.messages.push(currentMessage._id);
    }

    await Promise.all([groupChat.save(), currentMessage.save()]);

    const senderSocketId = getSocketId(senderId);

    if (senderSocketId) {
      if (message !== null && photo) {
        io.in(groupId).emit("newGroupMessage", {
          message,
          senderSocketId,
          photo,
          fullName,
          profilePic
        });
      } else if (photo === undefined && message !== null) {
        io.in(groupId).emit("newGroupMessage", {
          message,
          senderSocketId,
          fullName,
          profilePic
        });
      } else if (photo && message === null) {
        io.in(groupId).emit("newGroupMessage", {
          senderSocketId,
          photo,
          fullName,
          profilePic
        });
      }

      res.status(201).json({ message, photo });
    }
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getGroupMessages = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const senderId = req.user._id;

    const groupChat = await GroupChat.findOne({ _id: groupId }).populate({
      path: "messages",
      populate: {
        path: "sender",
      },
    });

    if (!groupChat) {
      return res.status(404).json({ error: "Internal server error" });
    }
    const messages = groupChat.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createGroup = async (req, res) => {
  try {
    const groupName = req.body.groupName;
    const groupAdmin = req.user._id;
    const senderId = req.user._id;
    const participants = req.body.participants;
    const groupPhoto = `https://avatar.iran.liara.run/username?username=${groupName}`;
    participants.push(senderId);

    const groupChat = await GroupChat.create({
      groupName: groupName,
      groupAdmin: groupAdmin,
      participants: participants,
      groupPhoto: groupPhoto,
    });

    const savedGroupChat = await groupChat.save();
    res.status(200).json(savedGroupChat);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getGroups = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const groupsChats = await GroupChat.find({
      participants: { $all: [loggedInUser] },
    }).populate({
      path: "messages",
      populate: {
      path: "sender",
  },

    })
    const populatedGroups = await Promise.all(
      groupsChats.map(async (groupChat) => {
        if (groupChat.messages.length > 0) {
          const lastMessage = groupChat.messages[groupChat.messages.length - 1];
          await Message.populate(lastMessage, { path: "sender" });
          groupChat.lastMessage = lastMessage;
        }
        return groupChat;
      })
    );

    
    res.status(201).json(groupsChats);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};