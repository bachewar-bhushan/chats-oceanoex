import path from "path"
import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import connectToMongoDB from "./db.js"
import cors from "cors";
import {app, server} from './socket/socket.js'
import groupChatRoutes from './routes/groupChatRoutes.js';
import chatRoutes from "./routes/chatRoutes.js"
dotenv.config();
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();
app.use(express.json({ limit: '100mb' }));
app.use(cookieParser()); 
app.use(cors({
	origin: 'http://localhost:8000',
	credentials: true, // Allow cookies to be sent with the request
  })); 
app.use(express.static('public'));
app.use('/uploads', express.static(path.join(__dirname, 'Backend', 'uploads')));
app.use(express.urlencoded({extended : false}))
app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/userAuth', userRoutes)
app.use('/api/group', groupChatRoutes)
app.use('/api/chat', chatRoutes)


app.use(express.static(path.join(__dirname, "/Frontend/dist")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`Server Running on port localhost http://localhost:${PORT}`);
});