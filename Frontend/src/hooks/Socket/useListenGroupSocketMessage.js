import { useEffect } from "react";
import { useSocketContext } from "./useSocketContext";
import { useStateManager } from "../../zustand/useStateManager";
// import {useGroupSocket} from "./useGroupSocket"
export const useListenGroupSocketMessage = () => {
  const { socket, setMessages, messages, setNewMessage, newMessage } = useStateManager();
  useSocketContext();

  useEffect(() => {
    socket?.on("newGroupMessage", (data) => {
      setNewMessage([...newMessage, data]);
    });

    // Remove the event listener when the component unmounts
    return () => {
      socket?.off("newGroupMessage");
    };
  }, [socket, setMessages, newMessage, messages]); // Include dependencies in the dependency array
};
