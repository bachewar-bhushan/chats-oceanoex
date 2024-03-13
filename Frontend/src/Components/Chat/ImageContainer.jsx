import React, { useEffect, useState } from "react";
import { useStateManager } from "../../zustand/useStateManager";
import { set } from "mongoose";
let selectedFile;
let hide
const ImageContainer = () => {
  const { image, setSelectedImage, selectedImage, setImage } = useStateManager();
  const [selectedFile, setSelectedFile] = useState(null);
  const [hide, setHide] = useState("");

  const handleCancel = () => {
    console.log("handle cancel clicked")
     setHide("hidden")
    setSelectedImage(null)
    setImage([])
    setSelectedFile(null);
  }
  useEffect(() => {
    console.log("ImageContainer useEffect running")
    const file = image[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setSelectedImage(objectUrl);
      setSelectedFile(file);
      setHide(""); 
    }

    return () => {
      setSelectedFile(null);
    }
  }, [image]);

  return (
    <>
      <div className={`flex flex-col w-[60vw] md:w-[30vw] h-[40vh] space-y-4 bg-slate-100 items-center justify-center shadow-2xl rounded-lg absolute bottom-[11vh] left-[9vw] md:left-[45vw]  md:bottom-[11vh] ${hide} ${selectedImage === null? "hidden" : ""}`}>
        <div onClick={handleCancel} className={`h-[0.5vh] w-[60vw] md:w-[30vw] flex justify-end mr-4 cursor-pointer `}>
        <svg className="size-[30px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 101 101" id="cross"><path d="M83.9 17.1c-.9-.9-2.5-.9-3.4 0l-30 30-30-30c-.9-.9-2.5-.9-3.4 0s-.9 2.5 0 3.4l30 30-30 30c-.9.9-.9 2.5 0 3.4.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7l30-30 30 30c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4l-30-30 30-30c.9-.9.9-2.4 0-3.4z"></path></svg>
        </div>
        <div className="text-2xl md:text-lg font-normal italic underline">{selectedFile?.name}</div>
        {selectedFile && (
          <div>
            <img
              className="w-[55vw] md:w-[25vw] h-[30vh] rounded-sm shadow-xl"
              src={selectedImage}
              alt="image"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ImageContainer;