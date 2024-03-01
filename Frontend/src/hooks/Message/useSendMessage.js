import toast from "react-hot-toast";
import { useStateManager } from "../../zustand/useStateManager";
export const useSendMessage = () => {
  const { image, selectedUser } = useStateManager();

  const sendMessage = async (receiverId, message) => {
    const formData = new FormData();

    formData.append("message", message);
    formData.append("chatId", selectedUser._id);

    for (const key of image) {
      formData.append("photo", key);
    }
    try {
      const response = await fetch(
        `/api/message/sendMessage/${receiverId}`,
        {
          method: "POST",
          headers: {
            "authtoken": localStorage.getItem("authtoken"),
          },
          //  body: JSON.stringify({ message }),
          body: formData,
        }
      );
    } catch (error) {
      toast.error("Message not send");
    }
  };
  return { sendMessage };
};
