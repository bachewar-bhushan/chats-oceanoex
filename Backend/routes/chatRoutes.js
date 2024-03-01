import express from "express";
import fetchuser from "../middleware/fetchuser.js";
import { createChat } from "../controllers/chatController.js";
const router = express.Router();


router.post('/createchat/:receiverId', fetchuser, createChat)

export default router;