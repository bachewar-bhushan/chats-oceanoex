import { useEffect, useState } from "react";
import { useStateManager } from "../../zustand/useStateManager";
import io from "socket.io-client";

export const useSocketContext = () => {
  let socket;
  const {
    setSocket,
    setOnlineUsers,
    setSocketId,
    newMessage,
    setNewMessage,
    selectedGroup,
    selectedUser,
  } = useStateManager();

  useEffect(() => {
    if (localStorage.getItem("userId") != undefined) {
      socket = io("http://localhost:8000", {
        transports: ["websocket"],
        query: { userId: localStorage.getItem("userId") },
      });
      setSocket(socket);
      socket.on("connect", () => {
        setSocketId(socket.id);
      });

      // join room for groups
      selectedGroup && socket.emit("joinRoom", { room: selectedGroup._id });
      // join personal chat using chat model Id
      selectedUser && socket.emit("joinChat", { chatId: selectedUser._id });
      socket.on("onlineUsers", (users) => {
        setOnlineUsers(users);
        console.log("onlineUsers has been set",users);
      });
      return () => {
        socket.off();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [localStorage.getItem("userId"), selectedGroup, selectedUser]);
};
