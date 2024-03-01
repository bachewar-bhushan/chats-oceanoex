import Chat from "../models/chatModel.js";

export const createChat = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.receiverId === "null" ? null : req.params.receiverId;
    if (receiverId === null) {
      res.status(200).json(null);
    } else {
      let chat = await Chat.findOne({
        participants: { $all: [senderId, receiverId] },
      });

      if (!chat) {
        chat = await Chat.create({
          participants: [senderId, receiverId],
        });
      }

      const savedChat = await chat.save();

      const sendChat = await Chat.findOne({
        participants: { $all: [senderId, receiverId] },
      })
        .populate({
          path: "participants",
          match: { _id: { $ne: req.user._id } },
        })
        .select("-messages");

      res.status(200).json(sendChat);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
