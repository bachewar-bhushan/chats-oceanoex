import { useStateManager } from '../../zustand/useStateManager'
export const useGetUser = () => {
    const {setUser, setLoggedInUser, loggedInUser} = useStateManager()
    console.log("useGetUser running")
    const getUser = async () => {
        try {
            const response = await fetch(`/api/userAuth/getuser`, {
                method: "GET",
                headers: { "Content-Type": "application/json", "authtoken": localStorage.getItem('authtoken') },
              });
             const  user = await response.json();
              
              setUser(user)
              setLoggedInUser(user)
              
        } catch (error) {
            console.log(error.message)
        }
    }
    return {getUser}
   
}
