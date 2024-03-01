import React, { useEffect } from "react";

import MessageArea from "../Components/Chat/MessageArea";

import Navbar from "../Components/Utils/Navbar";
import { useStateManager } from "../zustand/useStateManager";

const MChatSpaceConversation = () => {
  const { groupFormDivision } = useStateManager();
  return (
    <>
      <Navbar />
      <div className="flex">
        <div className={`flex ${groupFormDivision ? "opacity-40" : ""}`}>
          <div className="right w-[80vw] h-[93vh]">
            <MessageArea />
          </div>
        </div>
      </div>
    </>
  );
};

export default MChatSpaceConversation;
