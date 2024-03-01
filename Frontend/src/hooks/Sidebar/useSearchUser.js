import { useStateManager } from "../../zustand/useStateManager"
export const useSearchUser = () =>{
    const {sideBarUsers, setSideBarUsers} = useStateManager()
        const searchedUsers = async(query) =>{
            try {

      const response = await fetch(`/api/userAuth/search?query=${query}`,{
        method : 'POST',
        headers: {"Content-Type": "application/json", "authtoken" : localStorage.getItem("authtoken)")}
      })
      
      const searchResult = response.json()
      setSideBarUsers(searchResult)
    } catch (error) {
        console.error(error.message)
    }
}
return {searchedUsers}
}