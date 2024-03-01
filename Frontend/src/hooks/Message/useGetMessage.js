import toast from "react-hot-toast";
import { useStateManager } from "../../zustand/useStateManager";
import { useEffect } from "react";

export const useGetMessage = () => {
  const {
    setMessages,
    messages,
    selectedUser,
    setSelectedUser,
    sideBarNavigation,
    selectedGroup,
  } = useStateManager();

  useEffect(() => {
    const receiverId = selectedUser?.participants[0]?._id;
    const groupId = selectedGroup?._id;
   
    let url;
    if (sideBarNavigation === "chats") {
      url = `message/getMessages/${receiverId}`;
    } else if (sideBarNavigation === "groups") {
      url = `group/getGroupMessages/${groupId}`;
    }
    const getMessages = async () => {
      try {
        const response = await fetch(`/api/${url}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authtoken": localStorage.getItem("authtoken"),
          },
        });
        const message = await response.json();
        setMessages(message);
      } catch (error) {
        toast.error("Message not send");
        console.error(error.message);
      }
    };
    if (receiverId || groupId) {
      getMessages();
    }
  }, [selectedGroup, selectedUser]);
};
