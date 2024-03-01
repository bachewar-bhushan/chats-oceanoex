import mongoose from "mongoose";

const groupChatSchema = new mongoose.Schema(
  {
    groupName:{
      type: String,
      required: true,
    },
    groupAdmin : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
    groupPhoto : {
      type: String,
      default: "",
    },
    photos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },


  { timestamps: true }
);

const GroupChat = mongoose.model("GroupChat", groupChatSchema);

export default GroupChat;
