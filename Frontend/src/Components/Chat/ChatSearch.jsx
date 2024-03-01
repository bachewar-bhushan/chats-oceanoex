import React, { useEffect, useState } from "react";
import { useStateManager } from "../../zustand/useStateManager";

const ChatSearch = () => {
  const { messages, messageSearch, setMessageSearch } = useStateManager();

  // Use optional chaining to handle potential null or undefined
 
  //

  const handleSearch = (event) => {
    setMessageSearch(event.target.value);
  };

  return (
    <>
      <div>
        <form action="">
          <div className="flex h-[6vh] w-[20vw] justify-center items-center mt-3">
            <input
              className="outline-none p-4 h-[4vh] w-[15vw] text-xl rounded-full bg-slate-100"
              onChange={handleSearch}
              type="text"
              placeholder="Search ..."
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ChatSearch;
