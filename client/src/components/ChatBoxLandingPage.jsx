import React from 'react'
import ChatBoxPhoto from '../assets/ChatBoxPhoto.jpeg';

const ChatBoxLandingPage = () => {
  return (
    <div className='flex flex-row items-center gap-2 w-[300px] bg-gray-400 px-2 py-2 rounded-lg bg-opacity-50'>
      <img src={ChatBoxPhoto} className='w-[50px] h-auto rounded-[50px]' />
      <p className='font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing.</p>
    </div>
  )
}

export default ChatBoxLandingPage
