import React from "react";
import ChatSearch from "./ChatSearch";
import { useStateManager } from "../../zustand/useStateManager";
const MessageAreaHeader = () => {
  const { selectedUser, selectedGroup, sideBarNavigation, onlineUsers } =
    useStateManager();

  const isUserOnline = onlineUsers.some(
    (onlineUser) => onlineUser === selectedUser?.participants[0]?._id
  );
  return (
    <>
      {sideBarNavigation === "chats" && selectedUser && (
        <div className="flex justify-between items-center bg-slate-200 w-[100vw] md:w-[80vw] h-[10vh] p-5 shadow-lg rounded-lg">
          <div className="flex space-x-4 items-center">
            <div>
              <img
                className="size-[7vh]"
                src={selectedUser?.participants[0]?.profilePic}
                alt="img"
              />
            </div>
            <div className="flex flex-col">
              <div className="text-xl font-semibold">
                {selectedUser?.participants[0]?.fullName}
              </div>
              {isUserOnline && <p className="text-green-400">Online</p>}
            </div>
          </div>

          <div className="flex space-x-10">
            <ChatSearch />
          </div>
        </div>
      )}

      {sideBarNavigation === "groups" && selectedGroup && (
        <div className="flex justify-between items-center bg-slate-200 w-[100vw] md:w-[80vw] h-[10vh] p-5 shadow-lg rounded-lg">
          <div className="flex space-x-4 items-center">
            <div className="size-[70px] ">
              <img src={selectedGroup.groupPhoto} alt="img" />
            </div>
            <div className="text-xl font-semibold">
              {selectedGroup.groupName}
            </div>
          </div>

          <div className="flex space-x-10">
            <ChatSearch />
          </div>
        </div>
      )}
    </>
  );
};

export default MessageAreaHeader;
