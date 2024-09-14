import React from 'react'
import { AiOutlineSend } from "react-icons/ai";
import profile_pic from '../assets/user.png'
const ChatBox = ({ data }) => {
  return (
    <main>
      {data ?
        <div className='h-full w-full'>
          <section className='flex items-center border border-gray-300 rounded-lg shadow-md h-[8svh] p-4 bg-orange-100 px-5'>
            <img
              src={data.profile_pic ? data.profile_pic : profile_pic}
              alt="Profile"
              className='w-16 h-16 rounded-full object-cover border border-orange-300'
            />
            <div className='ml-4'>
              <p className='text-lg font-semibold text-gray-800'>{data.name}</p>
              <p className='text-sm text-gray-600'>{data.userName}</p>
            </div>
          </section>

          <section className='h-[82svh] overflow-y-auto component-with-scrollbar'></section>
          <section className='b h-[10svh flex flex-col items-center'>
            <div className='flex flex-row pt-5 w-[120svh] items-center gap-5'>
              <input type='textarea' placeholder='write you message' className='outline-none w-full px-5 py-2 text-xl rounded-lg border border-black bg-gray-100 bg-opacity-50 font-medium' />
              <button className='px-2 py-2 bg-orange-600 rounded-[30px] '><AiOutlineSend className='h-[30px] w-[30px] text-white' /></button>
            </div>
          </section>
        </div>
        :
        <div className="flex items-center justify-center min-h-screen bg-orange-50">
          <div className="text-center p-8 bg-white shadow-xl rounded-lg border border-orange-200">
            <p className="text-2xl font-bold text-orange-600 mb-4">Start chatting with Chatterly</p>
            <p className="mb-4 text-gray-700">
              Connect with friends and colleagues effortlessly. Chatterly makes communication simple and fun!
            </p>
            <p className="mb-4 text-gray-700">
              Create new conversations, stay updated, and keep your chats organized. Dive into the conversation now!
            </p>
            <p className="mb-4 text-gray-700">
              No chats yet? Start a new chat to connect with others. Chatterly is here to keep you engaged and informed.
            </p>
            <p className="text-sm text-gray-500">
              To start chatting, please select a conversation from the list or create a new one.
            </p>
          </div>
        </div>
      }
    </main >
  )
}

export default ChatBox
