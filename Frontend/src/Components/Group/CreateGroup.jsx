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
          <div className=" w-[20vw] flex justify-center ">
            <div
              className={`relative top-full left-0 bg-slate-100 border border-gray-300 mt-1 p-2 rounded-md w-[15vw] max-h-[30vh] overflow-y-auto`}
            >
              <div>
                {searchedUsers.map((user) => (
                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      handleSearchedUserClick(user);
                    }}
                    className="flex cursor-pointer m-5 items-center"
                  >
                    <div className="h-[50px] w-[50px]">
                      <img src={user.profilePic} alt="profile" />
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
    setQuery(event.target.value);
  };
  return (
    <>
      {groupFormDivision && (
        <div className="flex justify-center items-center w-[37vw] h-[80vh] bg-slate-300 absolute top-[10vh] left-[40vw] shadow-xl border border-collapse">
          
          <div className="flex flex-col justify-center items-center  w-[30vw] h-[76vh]">
          <div className="w-[37vw] flex justify-end pr-6 cursor-pointer" onClick={handleCancel}>
            <svg
            className="size-[4vh]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 101 101"
              id="cross"
            >
              <path d="M83.9 17.1c-.9-.9-2.5-.9-3.4 0l-30 30-30-30c-.9-.9-2.5-.9-3.4 0s-.9 2.5 0 3.4l30 30-30 30c-.9.9-.9 2.5 0 3.4.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7l30-30 30 30c.5.5 1.1.7 1.7.7.6 0 1.2-.2 1.7-.7.9-.9.9-2.5 0-3.4l-30-30 30-30c.9-.9.9-2.4 0-3.4z"></path>
            </svg>
          </div>
            <div className=" my-2 ml-4">
              <p className="mr-56 text-lg font-semibold text-slate-600 mb">
                Group Name
              </p>
              <input
                className="px-2 h-[6.5vh] w-[20vw] text-lg  bg-slate-100 border  rounded-md mr-24 outline-none text-slate-600"
                value={groupName}
                type="text"
                placeholder="Enter Group Name"
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>
            <p className="mr-72 mb-2 text-lg font-semibold text-slate-600">
              Participants
            </p>
            <div className="flex w-[25vw] h-[40vh] overflow-y-auto justify-center bg-slate-100 rounded-xl">
              <div className="grid grid-cols-3 gap-4 mt-4 pl-2">
                {groupParticipants &&
                  Array.isArray(groupParticipants) &&
                  groupParticipants.map((participant, i) => {
                    return (
                      <div key={i} className="">
                        <div className="w-[7vw]  break-words flex flex-col ">
                          <div className="">
                            <img
                              className="size-[2vw]"
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
              {/* <div>
                <button onClick={handleSubmit}>submit</button>
              </div> */}
            </div>
            <div className="">
              <div>
                <form action="">
                  <div className="flex h-[6vh] w-[20vw] justify-center items-center mt-3 mr-36">
                    <input
                      className="outline-none p-4 h-[4vh] w-[15vw] text-xl rounded-full bg-slate-100"
                      onChange={handleSearch}
                      type="text"
                      placeholder="Search ..."
                    />
                  </div>
                </form>
                {searchDivision()}
              </div>
              <button onClick={handleSubmit} className="float-right bg-blue-300 w-[7vw] h-[5vh] font-semibold rounded-md cursor-pointer hover:bg-blue-400">
                Submit
              </button>
            </div>{" "}
          </div>
        </div>
      )}
    </>
  );
};

export default CreateGroup;
