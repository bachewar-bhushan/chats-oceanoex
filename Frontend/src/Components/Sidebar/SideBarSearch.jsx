import React, { useEffect, useRef, useState } from "react";
import { useStateManager } from "../../zustand/useStateManager";
import { useGetAllUsers } from "../../hooks/Sidebar/useGetAllUsers";
import { useCreateChat } from "../../hooks/Chat/useCreateChat";
import { useGetGroups } from "../../hooks/Group/useGetGroups";

const SideBarSearch = () => {
  const {
    allUsers,
    divisionDisplay,
    setDivisionDisplay,
    setReceiverId,
    setNewMessage,
    myGroups,
    sideBarNavigation,
    setSelectedGroup,
  } = useStateManager();

  const searchRef = useRef(null);

  const [query, setQuery] = useState("");

  useGetAllUsers();
  useCreateChat();
  useGetGroups();

  useEffect(()=>{
    const handleClickOutside = (event) => {
      if(searchRef.current && !searchRef.current.contains(event.target)){
        setDivisionDisplay(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () =>{
      document.removeEventListener('click', handleClickOutside)
    }
  }, [setDivisionDisplay])

  const handleSearchInputClick = (event) => {
    event.stopPropagation();
    setDivisionDisplay(true);
  }

  const searchDivision = () => {

    const handleSearchedUserClick = (user) => {
      setReceiverId(user._id);
      setNewMessage([]);
      if (window.innerWidth < 640) {
        navigate("/mchatspaceconversation");
      }
    };

    const handleSearchedGroupClick = (group) => {
     setSelectedGroup(group);
     setNewMessage([]);
    };

    return (
      <>
        {searchedUsers.length > 0 && (
          <div className="w-[100vw] md:w-[20vw] flex justify-center ">
            <div
              className={` ${
                !divisionDisplay && "hidden"
              } relative top-full left-0 bg-slate-200 border border-gray-300 my-2 rounded-md w-[15vw] flex items-center `}
            >
              <div className="overflow-y-auto max-h-[65vh] w-[15vw] scrollbar-thumb-slate-300 scrollbar-track-slate-200  scrollbar-thin">
                {sideBarNavigation === "chats" &&
                  searchedUsers.map((user) => (
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        handleSearchedUserClick(user);
                      }}
                      className="flex cursor-pointer my-5 mx-4 items-center space-x-2"
                    >
                      <div className="size-[6vh]">
                        <img src={user.profilePic} alt="profile" />
                      </div>
                      <div>{user.fullName}</div>
                    </div>
                  ))}

                {sideBarNavigation === "groups" &&
                  searchedGroups.map((group) => (
                    <div
                      onClick={(e) => {
                        e.preventDefault();
                        handleSearchedGroupClick(group);
                      }}
                      className="flex cursor-pointer my-5 mx-4 items-center space-x-2"
                    >
                      <div className="size-[6vh]">
                        <img src={group.groupPhoto} alt="profile" />
                      </div>
                      <div>{group.groupName}</div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const searchedUsers = allUsers.filter((user) => {
    const users = user.fullName.toLowerCase().includes(query.toLowerCase());
    return users;
  });

  const searchedGroups = myGroups.filter((group) => {
    group.groupName.toLowerCase().includes(query.trim().toLowerCase())
  });

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <div ref={searchRef}>
        <form action="">
          <div className="flex h-[6vh] w-[100vw] md:w-[20vw] justify-center items-center mt-3">
            <input
              onClick={handleSearchInputClick}
              className="outline-none p-4 h-[4vh] w-[50vw] md:w-[15vw] text-xl rounded-full bg-slate-100"
              onChange={handleSearch}
              type="text"
              placeholder="Search ..."
            />
          </div>
        </form>
        {searchDivision()}
      </div>
    </>
  );
};

export default SideBarSearch;
