import http from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";
const app = express();

const server = http.createServer(app);
const io = new Server(server);
app.use(cors());
let socket;
export const getSocketId = (receiverId) => {
  return socketUsers[receiverId];
};

const socketUsers = {};
io.on("connection", (socket) => {
  socket = socket;
  console.log("user Connected", socket.id);
  // socket.emit("welcome", {message: "welcome user"})
  const user_id = socket.handshake.query.userId;
  if (user_id != "undefined") {
    socketUsers[user_id] = socket.id;
    console.log("socket users", socketUsers);
  }

  socket.on("joinRoom", (data) => {
    socket.join(data.room);

    // console.log("socket", socket)
    console.log("join room running");
  });
   socket.on("joinChat", (data) => {
      socket.join(data.chatId);
      console.log("chat joined joinChat")
    });

  io.emit("onlineUsers", Object.keys(socketUsers));
  

  socket.on("disconnect", () => {
    console.log("user-disconnected", socket.id);
    delete socketUsers[user_id];
    io.emit("onlineUsers", Object.keys(socketUsers));
  });
});
export const getReceiverSocketId = (receiverId) => {
  // receiverId is the receiver's mongoDB id
  return socketUsers[receiverId];
};

export { app, io, server, socket };
