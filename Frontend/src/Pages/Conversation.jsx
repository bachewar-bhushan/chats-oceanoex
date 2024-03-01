import React, { useEffect } from 'react'
import SideBar from '../Components/Sidebar/SideBar'
import MessageArea from '../Components/Chat/MessageArea'
import { useGetUser } from '../hooks/User/useGetUser'
import Navbar from '../Components/Utils/Navbar'
import { useStateManager } from '../zustand/useStateManager'
import CreateGroup from '../Components/Group/CreateGroup'
const Conversation = () => {
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
        <div className='left w-[20vw] h-[93vh] bg-slate-200'>
          <SideBar/>
        </div>
      <div className='right w-[80vw] h-[93vh]'>
        <MessageArea/>
      </div>
      </div>
      <CreateGroup/>
    </div>
    </>
  )
}

export default Conversation
