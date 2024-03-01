import React, { useEffect } from 'react'
import SideBar from '../Components/Sidebar/SideBar'

import { useGetUser } from '../hooks/User/useGetUser'
import Navbar from '../Components/Utils/Navbar'
import { useStateManager } from '../zustand/useStateManager'
import CreateGroup from '../Components/Group/CreateGroup'
const MSideBarConversation = () => {
    const {groupFormDivision} = useStateManager()
  const {getUser} = useGetUser()
    useEffect(() =>{
  getUser()
    }, [])
    return (
        <>
        <Navbar/>
        <div className="flex">
          <div className={`flex ${groupFormDivision ? "opacity-40" : ""}`}>
            <div className='left w-[100vw] md:w-[20vw] h-[93vh] bg-slate-200'>
              <SideBar/>
            </div>
          </div>
          <CreateGroup/>
        </div>
        </>
      )
    }
    
    export default MSideBarConversation