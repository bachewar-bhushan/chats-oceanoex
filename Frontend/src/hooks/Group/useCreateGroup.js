import toast from "react-hot-toast";
import { useStateManager } from "../../zustand/useStateManager";
import validator from "validator";

export const useCreateGroup = () => {
  const { setLoading } = useStateManager();

  const handleInputError = (groupName, participantIds) => {
    if (validator.isEmpty(groupName)) {
      toast.error("Enter the group name");
    }

    if (participantIds.length == 0) {
      toast.error("Please select participants");
    }
  };

  const createGroup = async (groupName, participantIds) => {
    handleInputError(groupName, participantIds);
    try {
      setLoading(true);
      const response = await fetch(`/api/group/creategroupchat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authtoken: localStorage.getItem("authtoken"),
        },
        body: JSON.stringify({
          groupName: groupName,
          participants: participantIds,
        }),
      });
      setLoading(false);
      if (response.ok) {
        toast.success("Group created successfully");
      } else {
        toast.error("Please try again");
      }
    } catch (error) {
      toast.error("Please try again");
      setLoading(false);
      console.error(error.message);
    }
  };
  return { createGroup };
};
