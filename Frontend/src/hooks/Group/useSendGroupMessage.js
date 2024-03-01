import toast from "react-hot-toast";
import { useStateManager } from "../../zustand/useStateManager";
export const useSendGroupMessage = () => {
  const { image, loggedInUser } = useStateManager();

  const sendGroupMessage = async (groupId, message) => {
    const formData = new FormData();

    formData.append("message", message);
    formData.append("fullName", loggedInUser.fullName);
    formData.append("profilePic", loggedInUser.profilePic);

    for (const key of image) {
      formData.append("photo", key);
    }

    try {
      const response = await fetch(
        `/api/group/sendGroupMessage/${groupId}`,
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
      console.error(error.message);
    }
  };
  return { sendGroupMessage };
};
