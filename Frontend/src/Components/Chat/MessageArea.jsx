import React, { useEffect, useRef } from "react";
import MessageAreaHeader from "./MessageAreaHeader";
import InputMessage from "./InputMessage";
import ChattingSpace from "./ChattingSpace";
import { useStateManager } from "../../zustand/useStateManager";

const MessageArea = () => {
  const { selectedUser, selectedGroup, sideBarNavigation } = useStateManager();
  const imageIndexRef = useRef(0);
  const images = [
    "/assets/Images/first.jpg",
    "/assets/Images/second.jpg",
    "/assets/Images/third.jpg",
    "/assets/Images/fourth.jpg",
    "/assets/Images/fifth.jpg",
    "/assets/Images/sixth.png",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      imageIndexRef.current = (imageIndexRef.current + 1) % images.length;
    }, 5000);
    console.log("page loading again and again");
    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <>
      <div className="w-[100vw] md:w-[80vw] h-[93vh] bg-slate-100 flex flex-col ">
        {!(selectedUser && sideBarNavigation === "chats") &&
        !(selectedGroup && sideBarNavigation === "groups") ? (
          <div className=" w-[79vw] h-[93vh] flex justify-center items-center">
            <img
              className="h-[50vh] w-[32vw]"
              src={images[imageIndexRef.current]}
              alt={`Image ${imageIndexRef.current + 1}`}
            />
          </div>
        ) : (
          <>
            <div>
              <MessageAreaHeader />
            </div>
            <div>{(selectedUser || selectedGroup) && <ChattingSpace />}</div>
            <div className="w-[100vw]  md:w-[80vw] bg-slate-100">
              <InputMessage />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MessageArea;
