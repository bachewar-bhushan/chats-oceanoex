import toast from 'react-hot-toast'
import { useStateManager } from '../../zustand/useStateManager'
export const useLogout = () => {
    const { socket } = useStateManager()

    const logout = async() =>{
        try {
              const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers : {'Content-Type': 'application/json'}
        })
        socket.disconnect();
    }
         catch (error) {
            toast.error("Failed to Logout")
            console.error(error.message)
        }
    } 
    return {logout}
}