import { useEffect, useState } from "react";

export const useGetUserForSidebar = () => {
  let sideBarUsers;
  const [fetchUser, setFetchUser] = useState([])

  useEffect(() => {
    const getUserForSidebar = async () => {
    try {
      const response = await fetch(`/api/userAuth/getusersforsidebar`, {
        method: "GET",
        
        headers: { "Content-Type": "application/json", "authtoken": localStorage.getItem("authtoken") },
      });
      sideBarUsers = await response.json();
      setFetchUser(sideBarUsers);
    } catch (error) {
      console.error(error.message);
    }
  };
  getUserForSidebar()

  },[])
  
  return { fetchUser };
 
};

