import User from "../models/userModel.js";
import Chat from "../models/chatModel.js";

export const getAllUsersForSidebar = async(req, res) => {
    try {
        const loggedinUser = req.user._id
        const fetchedUser = await User.find({_id: {$ne: loggedinUser}}).select("-password")
        res.status(200).json(fetchedUser)
    } catch (error) {
        console.error("Error in getusersforsidebar", error.message)
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getuser = async(req, res) => {
    try {
       const user = await User.findOne({_id : req.user._id})
       res.status(200).json(user)
    } catch (error) {
        console.error(error.message)
    }
}

export const searchUsers  = async(req, res) => {

    try {
        const { query } = req.query
        const users = await User.find({fullName : {$regex: query, $options: 'i'}})
        res.status(200).json(users)
    } catch (error) {
        console.error(error.message)
    }
}

export const myChatUsers = async (req, res) => {
    try {
        const loggedinUser = req.user.id
        const users = await Chat.find({
            participants: loggedinUser,
            messages: { $exists: true, $not: { $size: 0 } }
          }).populate({ path: 'participants',
          match: { _id: { $ne: req.user._id }}}).select("-messages")
          res.status(200).json(users)
    } catch (error) {
        console.log(error.message)
        res.status(404).json(error)
    }
}
