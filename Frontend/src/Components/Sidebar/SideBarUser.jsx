import React from "react";
import { useStateManager } from "../../zustand/useStateManager";
import { useNavigate } from "react-router-dom";

const SideBarUser = (props) => {
  const navigate = useNavigate();
  const {
    setSelectedUser,
    selectedUser,
    setNewMessage,
    sideBarNavigation,
    setSelectedGroup,
    selectedGroup,
    newMessage,
  } = useStateManager();

  const handleUserClick = () => {
    setSelectedUser(props.user);
    setNewMessage([]);
    setSelectedGroup(null);
    if (window.innerWidth < 640) {
      navigate("/mchatspaceconversation");
    }
  };

  const handleGroupClick = (e) => {
    e.preventDefault();
    setSelectedGroup(props.group);
    setNewMessage([]);
    setSelectedUser(null);
    if (window.innerWidth < 640) {
      navigate("/mchatspaceconversation");
    }
  };

  const sliceMessage = (message) => {
    const maxLength = 25; // Adjust this according to your needs

    if (!message) return ""; // Return empty string if message is not provided

    if (message.length <= maxLength) {
      return message; // If message length is less than or equal to maxLength, return the original message
    } else {
      // Split the message into words
      const words = message.split(" ");
      let slicedMessage = "";

      // Iterate over words until the length limit is reached
      for (let word of words) {
        if ((slicedMessage + word).length <= maxLength) {
          slicedMessage += word + " ";
        } else {
          break; // Stop if adding the next word exceeds the maxLength
        }
      }

      // Trim any extra space at the end and add '...' to indicate the message was sliced
      return slicedMessage.trim() + "...";
    }
  }
  return (
    <>
      {sideBarNavigation === "chats" && props.user && (
        <div
          onClick={() => {
            handleUserClick(props.user._id);
          }}
          className={`flex cursor-pointer m-5 items-center space-x-2 ${
            selectedUser &&
            selectedUser.participants[0]?._id === props.user.participants[0]._id
              ? "border-l-4 border-indigo-500"
              : ""
          }`}
        >
          <div className="size-[6vh]">
            <img src={props.user?.participants[0]?.profilePic} alt="profile" />
          </div>
          <div className="flex flex-col">
            <div className="text-xl font-normal">
              {props.user?.participants[0]?.fullName}
            </div>
            <div className="text-slate-400">
              {props.user?.participants[0]?._id ===
                selectedUser?.participants[0]?._id && newMessage.length > 0
                ? sliceMessage(newMessage[newMessage.length - 1].message)
                : sliceMessage(props.user?.messages[0].message)}
            </div>
          </div>
        </div>
      )}

      {sideBarNavigation === "groups" && (
        <div
          onClick={handleGroupClick}
          className={`flex cursor-pointer m-5 items-center space-x-2 ${
            props.group?._id === selectedGroup?._id
              ? "border-l-4 border-indigo-500"
              : ""
          }`}
        >
          <div className="size-[6vh]">
            <img src={props.group.groupPhoto} alt="profile" />
          </div>
          <div className=" flex flex-col">
            <div className="text-xl">{props.group.groupName}</div>
            <div className="">
              {props.group.messages && props.group.messages.length > 0 ? (
                <>
                  <div className="text-slate-600">
                    {props.group?._id === selectedGroup?._id &&
                    newMessage.length > 0
                      ? newMessage[newMessage.length - 1].fullName
                      : props.group?.messages[0].sender.fullName}
                  </div>
                  <div className="text-slate-400">
                    {props.group?._id === selectedGroup?._id &&
                    newMessage.length > 0
                      ? sliceMessage(newMessage[newMessage.length - 1].message)
                      : sliceMessage(props.group?.messages[0].message)}
                  </div>
                </>
              ) : (
                <div className="text-slate-400">No messages yet.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBarUser;