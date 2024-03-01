import { useEffect, useState } from "react";
import { useStateManager } from "../../zustand/useStateManager";

export const useGetAllUsers = () => {
const {setAllUsers} = useStateManager()

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await fetch(
          `/api/userAuth/getallusersforsidebar`,
          {
            method: "GET",

            headers: {
              "Content-Type": "application/json",
              "authtoken": localStorage.getItem("authtoken"),
            },
          }
        );
        const users = await response.json();
        setAllUsers(users);
      } catch (error) {
        console.error(error.message);
      }
    };
    getAllUsers();
  }, []);
};
