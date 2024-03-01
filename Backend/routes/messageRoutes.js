import express from "express";
import fetchuser from "../middleware/fetchuser.js";
import {getMessages, sendMessage} from "../controllers/messageController.js"
import {upload} from "../multer/multer.js"
const router = express.Router();


router.get("/getMessages/:receiverId", fetchuser, getMessages);
router.post("/sendMessage/:receiverId", upload.array('photo', 12), fetchuser, sendMessage);

export default router;
