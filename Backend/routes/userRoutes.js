import express from "express";
const router = express.Router();
import fetchuser from "../middleware/fetchuser.js";
import {getuser, getAllUsersForSidebar, searchUsers, myChatUsers} from "../controllers/userController.js"
router.get('/getallusersforsidebar', fetchuser, getAllUsersForSidebar)
router.get('/getuser', fetchuser, getuser)
router.post('/searchusers', fetchuser, searchUsers)
router.get('/mychatusers', fetchuser, myChatUsers)
export default router