import React, { useEffect } from 'react'
import { useGetUser } from '../../hooks/User/useGetUser'
import { useStateManager } from '../../zustand/useStateManager'

const SideBarHeader = () => {

  const {getUser} = useGetUser()
  const {user, sideBarNavigation} = useStateManager()

  
useEffect(() => {
    getUser(); // Call getUser only once when the component mounts
  }, []);
  return (
    <>
    <div className="flex justify-between items-center bg-slate-300 h-[10vh] p-5">
    {user && <div className="flex space-x-4 items-center">
            <div>                    {/*     changed the size */}
              <img className="size-[7vh]" src={user.profilePic} alt="img" />
            </div>
            <div className="text-xl font-semibold">{user.fullName}</div>
          </div>}
           <div>              {/*     Handle onclick */}
         
          </div>
    </div>
    </>
  )
}

export default SideBarHeader
