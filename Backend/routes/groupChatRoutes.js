import express from "express";
import fetchuser from "../middleware/fetchuser.js";

import { upload } from "../multer/multer.js";
import { createGroup, sendGroupMessage, getGroupMessages, getGroups } from "../controllers/groupChatController.js";
const router = express.Router();

router.get("/getGroupMessages/:groupId", fetchuser, getGroupMessages);
router.post("/sendGroupMessage/:groupId", upload.array('photo', 12), fetchuser, sendGroupMessage);
router.post("/creategroupchat", fetchuser, createGroup);
router.get("/getgroups", fetchuser, getGroups);
export default router;
