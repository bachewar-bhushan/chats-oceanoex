import React from 'react'
import ChattingSpace from './ChattingSpace'
import { useGetMessage } from '../../hooks/Message/useGetMessage'
import { useStateManager } from '../../zustand/useStateManager'

const FetchMessage = () => {
    useGetMessage()
    const {messages} = useStateManager()
    console.log("checking fetch messages",messages)
  return (
    <>
    {
        Array.isArray(messages) ? (
            messages.map((userMessages) =>{
                return(
                    <ChattingSpace userMessages={userMessages}/>
                )
            })
        ) : ("loading")
    }
    </>
  )
}

export default FetchMessage
