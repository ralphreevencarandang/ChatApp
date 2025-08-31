import React, { useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { getMessagesOptions } from '../react-queries/messageOptions';
import { useQuery } from '@tanstack/react-query';
import ChatHeader from './ChatHeader';
import MesssageInput from './MesssageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
const ChatContainer = () => {
  const { selectedUser} = useChatStore();
  const {authUser} = useAuthStore();
  const [loading, setLoading] = useState(true)

  // const {data, isPending} = useQuery(getMessagesOptions(selectedUser._id));


  console.log(selectedUser._id);
  console.log(authUser);
  
  if(loading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
          <ChatHeader/>
          <MessageSkeleton/>
         
          <MesssageInput/>
      </div>
    )
  }
  
  return (
    <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader/>
        <p>Messagess....</p>
        <MesssageInput/>

    </div>
  )
}

export default ChatContainer
