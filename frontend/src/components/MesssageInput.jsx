import React from 'react'
import { useMutation } from '@tanstack/react-query'
import { useState, useRef } from 'react'
import { X, Image, Send } from 'lucide-react'
import toast from 'react-hot-toast';

import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

import { sendMessageOptions } from '../react-queries/messageOptions'
const MesssageInput = () => {

  const [text, setText] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)

  const sendMessageMutation = useMutation(sendMessageOptions)
  //  Selected User ID
  const { selectedUser} = useChatStore();
  // Auth User Credentials
  const {authUser} = useAuthStore();
  
  

  const handleImageChange = (e)=>{
      const file = e.target.files[0];

      if(!file.type.startsWith('image/')){
        toast.error('Please select an image file');
        return 
      }

      const reader = new FileReader();
      reader.onloadend = ()=>{
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
  }

  const removeImage = ()=>{
      setImagePreview(null);
      if(fileInputRef.current) fileInputRef.current.value=''
  }


  const handleSendMessage = async (e) =>{
    e.preventDefault();
    if(!text.trim() && !imagePreview) return

    try {

         sendMessageMutation.mutate({
        id: selectedUser._id,
        values: {
        senderId: authUser._id,
        receiverId: selectedUser,
        text: text,
        image: imagePreview
        }

      })

      //  Clear Form
      setText('')
      setImagePreview(null)
      if(fileInputRef.current) fileInputRef.current.value = '' 
    } catch (error) {
      console.log('Error in handle send message: ', error);
      
    }
  }


  return (
    <div className='p-4 w-full'>
        {imagePreview &&  (
          <div className='mb-3 flex items-center gap-2'>
            <div className='relative'>
              <img src={imagePreview} alt="Preview" className='w-20 h-20 object-cover rounded-lg border border-zinc-700'/>
              <button
                onClick={removeImage}
                className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center'
                type='button'
              >
                  <X className='size-3'/>
              </button>
            </div>

          </div>
        )}

        <form onSubmit={(e)=> handleSendMessage(e)} className='flex items-center gap-2'>
          <div className='flex-1 flex gap-2'>
            <input type="text" className='w-full input-bordered rounded-lg input-sm sm:input-md px-2' placeholder='Type a message...'
              value={text}
              onChange={(e)=> setText(e.target.value)}
            />
            <input type="file" accept='image/*' className='hidden' ref={fileInputRef} onChange={handleImageChange} />
            <button type='button' className={`hidden sm:flex btn btn-circle ${imagePreview ? 'text-emerald-500' : 'text-zinc-400'}`}
              onClick={()=> fileInputRef.current?.click()}
            >
              <Image size={20}/>
            </button>

          </div>
          <button type='submit' className='btn btn-sm btn-circle' disabled={!text.trim() && !imagePreview}>
            <Send size={22}/>
          </button>


        </form>
    </div>
  )
}

export default MesssageInput
