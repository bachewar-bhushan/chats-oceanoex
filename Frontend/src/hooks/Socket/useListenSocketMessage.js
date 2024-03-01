import { useEffect } from "react";
import { useSocketContext } from "./useSocketContext";
import { useStateManager } from "../../zustand/useStateManager";

export const useListenSocketMessage = () => {
  const { socket, setMessages, messages, setNewMessage, newMessage } =
    useStateManager();
  useSocketContext();

  useEffect(() => {
    socket?.on("newMessage", (data) => {
      console.log("this is socket data", data)
      setNewMessage([...newMessage, data]);
    });

    // Remove the event listener when the component unmounts
    return () => {
      socket?.off("newMessage");
    };
  }, [socket, setMessages, newMessage, messages]); // Include dependencies in the dependency array
};
