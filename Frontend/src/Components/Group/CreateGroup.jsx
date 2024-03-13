import React, { useState } from "react";
import { useStateManager } from "../../zustand/useStateManager";
import { useGetAllUsers } from "../../hooks/Sidebar/useGetAllUsers";
import { useCreateGroup } from "../../hooks/Group/useCreateGroup";
const CreateGroup = () => {
  const {
    allUsers,
    setGroupParticipants,
    groupParticipants,
    groupFormDivision,
    setGroupFormDivision,
    loading
  } = useStateManager();
  const { createGroup } = useCreateGroup();
  const [query, setQuery] = useState("");
  const [groupName, setGroupName] = useState("");

  useGetAllUsers();

  const handleCancel = (e) => {
    e.preventDefault()
    setGroupFormDivision(false)
    setGroupParticipants([])
    setGroupName("")
    setQuery("")
    getGroups()
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const participantIds = groupParticipants.map((participant) => participant._id)
    createGroup(groupName, participantIds);
    setGroupName("");
    setGroupParticipants([]);
    setGroupFormDivision(false)
  };

  const searchDivision = () => {
    const handleSearchedUserClick = (user) => {
      console.log("handle search user click running");
      setGroupParticipants([...groupParticipants, user]);
    };
    return (
      <>
        {searchedUsers.length > 0 && (
          <div className="w-[60vw] sm:w-[24vw] flex justify-center px-[2vw]">
            <div
              className={`relative top-full left-0 bg-slate-100 border border-gray-300 mt-1 p-[2vw] sm:p-[1vw] rounded-md w-[55vw] sm:w-[20vw] max-h-[30vh] overflow-y-auto  scrollbar-thumb-slate-300 scrollbar-track-slate-200 scrollbar-thin`}
            >
              <div className="sm:w-[15vw]">
                {searchedUsers.map((user) => (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      handleSearchedUserClick(user);
                    }}
                    className="flex cursor-pointer m-5 sm:m-0 items-center sm:mb-[2vw]"
                  >
                    <div className="" >
                      <img className="w-[9vw] h-[9vw] sm:w-[3vw] sm:h-[3vw] mr-[2vw] sm:mr-[1vw]" src={user.profilePic} alt="profile" />
                    </div>
                    <div>{user.fullName}</div>
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
  const handleSearch = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  };
  return (
    <>
      {groupFormDivision && (
       
        <div className="flex justify-center items-center w-[90vw] sm:w-[37vw] h-[80vh] bg-slate-300 absolute top-[10vh] left-[5vw] sm:left-[40vw] shadow-xl border border-collapse">
        
          <div className="flex flex-col justify-center items-center w-[83vw] sm:w-[30vw] h-[76vh]">
          
          <div className="w-[83vw] sm:w-[37vw] flex justify-end sm:pr-6 cursor-pointer" onClick={handleCancel}>
            <svg
            className="size-[4vh]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 101 101"
              id="cross"
            >
              <path d="M83.9 17.1c-.9-.9-2.5-.9-3.4 0l-30 30-30-30c-.9-.9-2.5-.9-3.4 0s-.9 2.5 0 3.4l30 30-30 30c-.9.9-.9 2.5 0 3.4.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7l30-30 30 30c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4l-30-30 30-30c.9-.9.9-2.4 0-3.4z"></path>
            </svg>
          </div>
            <div className=" my-2 sm:ml-[0vw]">
              <p className=" text-lg font-semibold text-slate-600">
                Group Name
              </p>
              
              <input
                className="px-[3vw] sm:px-[1vw] h-[6.5vh] w-[73vw] sm:w-[20vw] text-lg  bg-slate-100 border  rounded-md mr-[2vw] sm:mr-24 outline-none text-slate-600"
                value={groupName}
                type="text"
                placeholder="Enter Group Name"
                onClick={(e) => { e.preventDefault(); }}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
          
            <p className="w-[73vw] sm:w-[20vw] sm:mr-[6vw] mb-2 text-lg font-semibold text-slate-600">
              Participants
            </p>
           
            <div className="flex w-[73vw] sm:w-[25vw] h-[40vh] sm:mr-[1vw] overflow-y-auto scrollbar-thin  scrollbar-thumb-slate-300 scrollbar-track-slate-200  justify-center bg-slate-100 rounded-xl">
        
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-4 mt-1 sm:mt-4 pl-2">
                {groupParticipants &&
                  Array.isArray(groupParticipants) &&
                  groupParticipants.map((participant, i) => {
                    return (
                      <div key={i} className="">
                        <div className="w-[20vw] sm:w-[7vw]  break-words flex flex-col ">
                          <div className="">
                            <img
                              className="size-[9vw] sm:size-[2vw]"
                              src={participant.profilePic}
                              alt=""
                            />
                          </div>
                          <div className="">{participant.fullName}</div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            
            <div className="">
              <div>
                <form action="">
                  <div className="sm:flex h-[6vh] w-[73vw] sm:w-[20vw] sm:justify-center sm:items-center mt-[2vh] sm:mr-[10vw]">
                    
                    <input
                      className="outline-none mr-[1vw] p-4 h-[4vh] w-[29vw] sm:w-[15vw] text-xl rounded-full bg-slate-100"
                      onChange={handleSearch}
                      type="text"
                      placeholder="Search ..."
                    />
                  </div>
                </form>
                {searchDivision()}
              </div>
              <button onClick={handleSubmit} className="float-right bg-blue-300 w-[15vw] sm:w-[7vw] h-[5vh]  font-semibold rounded-md cursor-pointer hover:bg-blue-400">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateGroup;