import { useEffect } from "react";
import { useStateManager } from "../../zustand/useStateManager";

export const useCreateChat = () => {
  const { setSelectedUser, receiverId } = useStateManager();

  useEffect(() => {
    const createChat = async () => {
      try {
        const response = await fetch(`/api/chat/createchat/${receiverId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authtoken": localStorage.getItem("authtoken"),
          },
        });
        const data = await response.json();

        setSelectedUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    createChat();
  }, [receiverId]);
};
