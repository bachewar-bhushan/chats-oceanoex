import { useEffect } from "react"
import { useStateManager } from "../../zustand/useStateManager"

export const useGetGroups = () =>{
    const {setMyGroups, groupFormDivision, selectedGroup} = useStateManager()

    
   useEffect(() =>{
    const getGroups = async() =>{
         try {
       const response = await fetch(/api/group/getgroups, {
        method: "GET",
        headers : {"content-type": "application/json", authtoken: localStorage.getItem("authtoken")}
       })
       const groups =  await response.json()
       
       setMyGroups(groups)
    } catch (error) {
        console.error(error.message)
    }
    }
   getGroups()
   }, [groupFormDivision, selectedGroup])                // TODO set loggedinuser for fetching all things at start
}