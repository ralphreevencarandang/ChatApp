
import { useChatStore } from '../store/useChatStore'
import { getMessagesOptions } from '../react-queries/messageOptions';
import { useQuery, useQueryClient  } from '@tanstack/react-query';
import ChatHeader from './ChatHeader';
import MesssageInput from './MesssageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';
import { useEffect, useRef } from 'react';

const ChatContainer = () => {
  const { selectedUser, messages, setMessages, subscribeToMessages} = useChatStore();

  const {authUser,socket} = useAuthStore();
  const queryClient = useQueryClient();

  const messageEndRef = useRef();


  // Only fetch messages when selectedUser changes
  const { data, isPending, isFetching, refetch } = useQuery({
    ...getMessagesOptions(selectedUser._id),
    enabled: !!selectedUser?._id, // Only run query if selectedUser exists
  });



  // Listen for real-time messages
  useEffect(() => {
    if (!socket || !selectedUser) return;

    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id && newMessage.receiverId !== selectedUser._id) {
        return; // ignore messages not for this chat
      }

      // Push new message into React Query cache
      queryClient.setQueryData(["messages", selectedUser._id], (oldData) => {
        if (!oldData) return { messages: [newMessage] };
        return { ...oldData, messages: [...oldData.messages, newMessage] };
      });
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket, selectedUser, queryClient]);

    useEffect(()=>{

      if(messageEndRef.current ){

        messageEndRef.current.scrollIntoView({behavior: 'smooth'});
      }

  },[data?.messages])


  


  if(isFetching) {
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
        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
              {data && data.messages?.map((message) => (
                  <div key={message._id} className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'} `} ref={messageEndRef}>
                     <div className="chat-image avatar">
                        <div className="w-10 rounded-full border">
                          <img
                            alt="Profile pic"
                            src={message.senderId === authUser._id ? authUser.profilePic || '/avatar.png' : selectedUser.profilePic || '/avatar.png'}
                          />
                        </div>
                      </div>
                      <div className="chat-header mb-1">
                        <time className="text-xs opacity-50 ml-1">{formatMessageTime(message.createdAt)} </time>
                      </div>
                      <div className="chat-bubble flex flex-col">
                        {message.image && (
                          <img src={message.image} alt="Attachment" className='sm:max-w-[200px] rounded-md mb-2'/>
                        )}
                        {message.text && <p>{message.text}</p>}
                      </div>
                  </div>
              )) }
        </div>

        {data ? console.log('Meron')
         : 'Wala'}
        <MesssageInput/>

    </div>
  )
}

export default ChatContainer
