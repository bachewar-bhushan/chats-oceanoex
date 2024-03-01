import React from "react";
import { useStateManager } from "../../zustand/useStateManager";
import { useListenSocketMessage } from "../../hooks/Socket/useListenSocketMessage";
import { useListenGroupSocketMessage } from "../../hooks/Socket/useListenGroupSocketMessage";
import { useGetMessage } from "../../hooks/Message/useGetMessage";
import ScrollToBottom from "react-scroll-to-bottom";

const host = "/uploads";

const ChattingSpace = () => {
  const { newMessage, messages, socketId, messageSearch, sideBarNavigation } =
    useStateManager();
  useGetMessage();
  useListenSocketMessage();
  useListenGroupSocketMessage();
  console.log("Page Rendering again and again chatting space.jsx");

  const messagebox = (
    user,
    message,
    side,
    filename,
    fullName,
    profilePic,
    key
  ) => {
    const highlight =
      messageSearch &&
      message?.toLowerCase().includes(messageSearch.toLowerCase())
        ? "bg-yellow-100"
        : "";

    if (user) {
      return (
        <>
          {message !== "" && (
            <div
              key={key}
              className={`${side} break-all float-left clear-both text-xl bg-slate-200 font-normal m-2 max-w-[50vw] md:max-w-[40vw] px-3 rounded-[15px] flex items-center  messagecontainer ${highlight}`}
            >
              {sideBarNavigation === "chats" && <div className="text-2xl md:text-md">{message}</div>}
              {sideBarNavigation === "groups" && (
                <div className="flex flex-col break-words">
                  <div className="flex my-2">
                    <div className="h-6 w-6">
                      <img src={profilePic} alt="" />
                    </div>
                    <div className="text-sm font-semibold">{fullName}</div>
                  </div>
                  <div className="text-2xl md:text-md break-words px-2 mb-2" >{message}</div>
                </div>
              )}
            </div>
          )}

          {filename !== "" && (
            <div
              key={key}
              className={`${side} float-left rounded-[15px] w-[50vw] md:w-[11vw] h-[26vh] bg-slate-200 flex justify-center items-center clear-both m-2 flex-col`}
            >
              {sideBarNavigation === "groups" && (
                <div>
                <div className="flex items-center my-2">
                  <div className="h-6 w-6">
                    <img src={profilePic} alt="" />
                  </div>
                  <div className="text-sm font-semibold">{fullName}</div>
                </div>
              
              <img
                className="w-[45vw] h-[20vh]"
                src={`${host}/${filename}`}
                alt="photo"
              /></div>)}
              {sideBarNavigation === "chats" && (
                <img
                className="w-[45vw] h-[24vh]"
                src={`${host}/${filename}`}
                alt="photo"
              />
              )}
            </div>
          )}
        </>
      );
    } else {
      return (
        <>
          {message && (
            <div
              key={key}
              className={`${side} break-all float-right  text-xl clear-both  bg-blue-100 font-normal m-2  max-w-[40vw]  px-3 rounded-[15px] flex items-center messagecontainer ${highlight}`}
            >
              {sideBarNavigation === "chats" && <div className="text-2xl md:text-md">{message}</div>}
              {sideBarNavigation === "groups" && (
                <div className="flex flex-col break-words">
                  <div className="flex my-2">
                    <div className="h-6 w-6">
                      <img src={profilePic} alt="" />
                    </div>
                    <div className="text-sm font-semibold">{fullName}</div>
                  </div>
                  <div className="text-2xl md:text-md break-words px-2 mb-2">{message}</div>
                </div>
              )}
            </div>
          )}

          {filename && (
            <div
              key={key}
              className={`${side} my-4 float-right rounded-[15px] w-[50vw] md:w-[11vw] h-[26vh] bg-slate-200 flex justify-center items-center clear-both m-2 flex-col`}
            >
              {sideBarNavigation === "groups" && (
                <div>
                <div className="flex items-center my-2">
                  <div className="h-6 w-6">
                    <img src={profilePic} alt="" />
                  </div>
                  <div className="text-sm font-semibold">{fullName}</div>
                </div>
              
              <img
                className="w-[45vw] h-[20vh]"
                src={`${host}/${filename}`}
                alt="photo"
              /></div>)}
              {sideBarNavigation === "chats" && (
                <img
                className="w-[45vw] h-[24vh]"
                src={`${host}/${filename}`}
                alt="photo"
              />
              )}
            </div>
          )}
        </>
      );
    }
  };

  return (
    <ScrollToBottom className="bg-slate-100 w-[100vw] md:w-[80vw] h-[70vh] overflow-auto ... ">
      {messages &&
        messages.map((message, i) => {
          return messagebox(
            message.sender._id === localStorage.getItem("userId") ? "" : "user",
            message.message,
            message.sender._id === localStorage.getItem("userId")
              ? "right"
              : "left",
            message.photo[0]?.filename || "",
            message.sender.fullName,
            message.sender.profilePic,
            i
          );
        })}

      {newMessage &&
        newMessage.map((message, i) => {
          console.log("this is", message);
          return messagebox(
            message.senderSocketId === socketId ? "" : "user",
            message.message !== undefined ? message.message : "",
            message.senderSocketId === socketId ? "right" : "left",
            message.photo[0]?.filename || "",
            sideBarNavigation === "chats" ? "" : message.fullName,
            message.profilePic,
            i
          );
        })}
    </ScrollToBottom>
  );
};

export default ChattingSpace;
