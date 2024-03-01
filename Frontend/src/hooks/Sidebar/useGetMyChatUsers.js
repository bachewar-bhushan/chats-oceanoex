import { useEffect, useState } from "react";
import { useStateManager } from "../../zustand/useStateManager";
export const useGetMyChatUsers = () => {
    const {setMyChatUsers, receiverId, divisionDisplay, selectedUser} = useStateManager();
 
  useEffect(() => {
    const getMyChatUsers = async () => {
    try {
      const response = await fetch(`/api/userAuth/mychatusers`, {
        method: "GET",
        
        headers: { "Content-Type": "application/json", "authtoken": localStorage.getItem("authtoken") },
      });
      const sideBarUsers = await response.json();
      setMyChatUsers(sideBarUsers);
    } catch (error) {
      console.error(error.message);
    }
  };
  getMyChatUsers()

  },[divisionDisplay, selectedUser])
};
