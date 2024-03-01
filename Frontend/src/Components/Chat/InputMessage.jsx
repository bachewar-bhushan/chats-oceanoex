import React from "react";
import { useSendMessage } from "../../hooks/Message/useSendMessage";
import { useStateManager } from "../../zustand/useStateManager";
import { useSendGroupMessage } from "../../hooks/Group/useSendGroupMessage";
import ImageContainer from "./ImageContainer";

const InputMessage = () => {
  const { selectedUser, image, setImage, selectedGroup, sideBarNavigation, setSelectedImage } =
    useStateManager();
  const { sendMessage } = useSendMessage();
  const {sendGroupMessage} = useSendGroupMessage()

  const handleSend = async (e) => {
    e.preventDefault();
    const message = document.getElementById("message").value;
    // setNewMessage(null);

    const receiverId = selectedUser?.participants[0]?._id;
    const groupId = selectedGroup?._id;

    if(sideBarNavigation === "chats"){
 await sendMessage(receiverId, message);
    }else if(sideBarNavigation === "groups"){
      await sendGroupMessage(groupId, message)
    }
   
    document.getElementById("message").value = "";
    setImage([])
    setSelectedImage(null)
  };
  return (
    <>
    
      <div className=" mt-8 h-[5vh] bg-slate-100 mb-5 flex md:justify-center items-center  ">
      <ImageContainer/>
        <form className="flex space-x-4" encType="multipart/form-data" method="post">
          <label htmlFor=""></label>
          <input
            id="message"
            className=" h-[7vh] w-[60vw] text-2xl rounded-xl shadow-lg  outline-none px-4"
            type="text"
          />
          <div className="button-container h-[7vh] flex items-center  bg-slate-200 rounded-full w-[30vw] md:w-[6vw]">
            <div className="h-[8vh] w-[15vw] md:w-[3vw] p-4  bg-slate-200 rounded-l-full hover:bg-slate-300 flex items-center">
             
              <button
              className="hover:animate-bounce ..."
                type="button"
                onClick={(e) => {
                  e.preventDefault;
                  document.getElementById("photo").click();
                }}
              >
                <svg
                  className="size-[4vh]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="attach"
                >
                  <path d="M18.08,12.42,11.9,18.61a4.25,4.25,0,0,1-6-6l8-8a2.57,2.57,0,0,1,3.54,0,2.52,2.52,0,0,1,0,3.54l-6.9,6.89A.75.75,0,1,1,9.42,14l5.13-5.12a1,1,0,0,0-1.42-1.42L8,12.6a2.74,2.74,0,0,0,0,3.89,2.82,2.82,0,0,0,3.89,0l6.89-6.9a4.5,4.5,0,0,0-6.36-6.36l-8,8A6.25,6.25,0,0,0,13.31,20l6.19-6.18a1,1,0,1,0-1.42-1.42Z"></path>
                </svg>
              </button>
              <input
                className="bg-black text-white cursor-pointer hidden"
                multiple
                id="photo"
                accept=".png, .jpg, .jpeg"
                name="photo"
                type="file"
                onChange={(e) => {
                  setImage(e.target.files)
                  console.log("setImage is running")
                }}
              />
            </div >
            <div className="bg-slate-200 rounded-r-full flex items-center hover:bg-slate-300 h-[8vh] w-[15vw] md:w-[3vw] p-3">
             
              <button type="submit" className="hover:translate-x-2" onClick={handleSend}>
                <svg
                  className="size-[4vh]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="paper-plane"
                >
                  <path d="M20.34,9.32l-14-7a3,3,0,0,0-4.08,3.9l2.4,5.37h0a1.06,1.06,0,0,1,0,.82l-2.4,5.37A3,3,0,0,0,5,22a3.14,3.14,0,0,0,1.35-.32l14-7a3,3,0,0,0,0-5.36Zm-.89,3.57-14,7a1,1,0,0,1-1.35-1.3l2.39-5.37A2,2,0,0,0,6.57,13h6.89a1,1,0,0,0,0-2H6.57a2,2,0,0,0-.08-.22L4.1,5.41a1,1,0,0,1,1.35-1.3l14,7a1,1,0,0,1,0,1.78Z"></path>
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default InputMessage;
